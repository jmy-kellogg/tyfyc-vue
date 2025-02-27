<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

import DocUploaderVue from "./inputs/DocUploader.vue";
import SkillsVue from "./inputs/Skills.vue";
import JobsVue from "./inputs/Jobs.vue";
import EducationVue from "./inputs/Education.vue";
import type { PersonalStateUpdate } from "../../types";

export default defineComponent({
  name: "ManualForm",
  components: { DocUploaderVue, SkillsVue, JobsVue, EducationVue },
  computed: {
    ...mapState("personal", [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "linkedIn",
      "gitHub",
      "summary",
    ]),
  },
  methods: {
    async updateData(
      field: PersonalStateUpdate["field"],
      value: PersonalStateUpdate["value"]
    ) {
      this.$store.dispatch("personal/updateData", { field, value });
    },
  },
});
</script>

<template>
  <div class="bg-white mr-5 p-5">
    <form>
      <DocUploaderVue />
      <h2><b>Personal</b></h2>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm/6 font-medium"
            >First name</label
          >
          <div class="mt-2">
            <input
              type="text"
              id="first-name"
              name="first-name"
              autocomplete="given-name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="firstName"
              @input="updateData('firstName', $event.target.value)"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm/6 font-medium"
            >Last name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="lastName"
              @input="updateData('lastName', $event.target.value)"
            />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm/6 font-medium"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="email"
              @input="updateData('email', $event.target.value)"
            />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="phone" class="block text-sm/6 font-medium">Phone</label>
          <div class="mt-2">
            <input
              id="phone"
              name="phone"
              type="phone"
              autocomplete="phone"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="phone"
              @input="updateData('phone', $event.target.value)"
            />
          </div>
        </div>

        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm/6 font-medium">City</label>
          <div class="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              autocomplete="address-level2"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="city"
              @input="updateData('city', $event.target.value)"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="state" class="block text-sm/6 font-medium">State</label>
          <div class="mt-2">
            <input
              type="text"
              name="state"
              id="state"
              autocomplete="address-level1"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="state"
              @input="updateData('state', $event.target.value)"
            />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="linkedin" class="block text-sm/6 font-medium"
            >LinkedIn</label
          >
          <div class="mt-2">
            <input
              id="linkedin"
              name="linkedin"
              type="linkedin"
              autocomplete="linkedin"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="linkedIn"
              @input="updateData('linkedIn', $event.target.value)"
            />
          </div>
        </div>

        <div class="sm:col-span-4">
          <label for="email" class="block text-sm/6 font-medium">GitHub</label>
          <div class="mt-2">
            <input
              id="github"
              name="github"
              type="github"
              autocomplete="github"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="gitHub"
              @input="updateData('gitHub', $event.target.value)"
            />
          </div>
        </div>

        <div class="col-span-full">
          <h2><b>Summary</b></h2>
          <label for="summary" class="block text-sm/6 font-medium"
            >Summary</label
          >
          <div class="mt-2">
            <textarea
              name="summary"
              id="summary"
              rows="3"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              :value="summary"
              @input="updateData('summary', $event.target.value)"
            ></textarea>
          </div>
        </div>
        <SkillsVue />
        <JobsVue />
        <EducationVue />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
