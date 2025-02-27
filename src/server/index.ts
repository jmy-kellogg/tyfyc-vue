import PDFParser from "pdf2json";
import multer from "multer";
import express, { type Request, type Response } from "express";

import { snake_case_string, divider } from "../utils/index.ts";
import type {
  Personal,
  SkillsList,
  JobsList,
  EducationList,
  ParsedData,
} from "../types";

export const app = express();

const removeSubString = (str: string, sub: string): string => {
  return str.replace(sub, "")?.trim() || "";
};

const getPersonal = (textData: Array<string> = []): Personal => {
  const names = textData[0]?.split(" ") || [];
  const contacts = textData[1]?.split("|") || [];
  const location = removeSubString(contacts[2], "Location: ").split(", ") || [];
  const sites = textData[2]?.split("|") || [];
  const summary = textData[4] || "";

  return {
    firstName: names[0]?.trim() || "",
    lastName: names[1]?.trim() || "",
    email: removeSubString(contacts[0], "Email: "),
    phone: removeSubString(contacts[1], "Phone: "),
    city: location[0]?.trim() || "",
    state: location[1]?.trim() || "",
    linkedIn: removeSubString(sites[0], "LinkedIn: "),
    gitHub: removeSubString(sites[1], "GitHub: "),
    summary: summary,
  };
};

const getSkills = (textData: Array<string> = []): SkillsList => {
  const skills = textData
    .slice(
      textData.indexOf("Skills") + 1,
      textData.indexOf("Professional Experience") - 1
    )
    .map((skill) => ({
      label: skill,
      value: snake_case_string(skill),
    }));

  return skills;
};

const getJobs = (textData: Array<string> = []): JobsList => {
  const jobs = textData
    .slice(
      textData.indexOf("Professional Experience") + 1,
      textData.indexOf("Education")
    )
    .join("|||")
    .split(divider());

  const respJobs: JobsList = [];

  jobs.forEach((element) => {
    const job = element.split("|||").filter((str) => !!str.trim());

    if (job.length) {
      respJobs.push({
        title: job[0] || "",
        company: job[1]?.split(" - ")[0]?.trim() || "",
        location: job[1]?.split(" - ")[1]?.trim() || "",
        start: job[2]?.split(" - ")[0]?.trim() || "",
        end: job[2]?.split(" - ")[1]?.trim() || "",
        description: job.slice(3, job.length).join(" "),
      });
    }
  });

  return respJobs;
};

const getEducation = (textData: Array<string> = []): EducationList => {
  const education = textData
    .slice(textData.indexOf("Education") + 1, textData.length)
    .filter((line) => {
      return !(line.includes("Page (") && line.includes(") Break"));
    })
    .join("|||")
    .split(divider());

  const respEdu: EducationList = [];

  education.forEach((element) => {
    const edu = element.split("|||").filter((str) => !!str.trim());
    if (edu.length == 2) {
      respEdu.push({
        degree: edu[0] || "",
        school: edu[1]?.split(" - ")[0]?.trim() || "",
        gradYear: edu[1]?.split(" - ")[1]?.trim() || "",
      });
    }
  });

  return respEdu;
};

const parseTextData = (rawText: string): ParsedData => {
  const textData = rawText.split("\r\n").filter((str) => !!str.trim());

  return {
    personal: getPersonal(textData),
    skills: getSkills(textData),
    jobs: getJobs(textData),
    education: getEducation(textData),
  };
};

// ToDo: find a better upload solution
const upload = multer({ dest: "uploads/" });
app.post("/parser", upload.single("file"), (req: Request, res: Response) => {
  try {
    const pdfParser = new PDFParser(this, true);
    const path = req?.file?.path || "";

    pdfParser.loadPDF(path);
    pdfParser.on("pdfParser_dataError", (errData) => {
      return res.status(500).send({ error: errData.parserError });
    });
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      if (pdfData?.Meta?.Author === "tyfyc") {
        const rawText = pdfParser.getRawTextContent() || "";
        const textData = parseTextData(rawText);
        return res.status(200).send(textData);
      } else {
        return res.status(400).send({ error: "Can only accept TYFYC resumes" });
      }
    });
  } catch (err) {
    return res.status(400).send({ error: "Can only accept TYFYC resumes" });
  }
});
