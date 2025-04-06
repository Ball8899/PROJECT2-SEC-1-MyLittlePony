<script setup>
import { defineProps, computed, ref, defineEmits, watch } from "vue";
import { checkName, checkDay } from "../../utils/toolUtil.js";
import NotiDialog from "../validate/NotiDialog.vue";

const emit = defineEmits(["sendUserForm"]);

const props = defineProps({
  passenger: {
    type: Number,
  },
});

const uptodateIndex = ref(null);
const openForm = ref(false);

const formData = ref(
  Array.from({ length: props.passenger }, () => ({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    nationality: "",
  }))
);

const tempFormData = ref({
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  nationality: "",
});

const form = (index) => {
  tempFormData.value = { ...formData.value[index] };
  openForm.value = !openForm.value;
  uptodateIndex.value = index;
};

const checkGender = ref(false)
const checkNationality = ref(false)
const checkPastDate = ref(false)
const checkFirstName = ref(false)
const checkLastName = ref(false)

const saveForm = () => {
  if (!checkName(tempFormData.value.firstName) || tempFormData.value.firstName == "") {
    checkFirstName.value = true
    return
  } else if (!checkName(tempFormData.value.lastName) || tempFormData.value.lastName == "") {
    checkLastName.value = true
    return
  } else if (tempFormData.value.gender == "") {
    checkGender.value = true
    return
  } else if (!checkDay(tempFormData.value.dob) || tempFormData.value.dob == "") {
    checkPastDate.value = true
    return
  } else if(tempFormData.value.nationality == "") {
    checkNationality.value = true
    return
  }
  formData.value[uptodateIndex.value] = { ...tempFormData.value };
  openForm.value = false;
  emit("sendUserForm", formData.value);
};

const passengers = computed(() => {
  let list = [];
  for (let i = 0; i < props.passenger; i++) {
    list.push(i);
  }
  return list;
});

const clearInput = () => {
  tempFormData.value = {
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    nationality: "",
  };
};
</script>

<template>
  <div class="py-6 px-4">
    <div
      v-if="openForm"
      class="fixed inset-0 bg-gray-500/50 bg-opacity-75 z-40 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <div
        class="bg-white rounded-xl shadow-md max-w-4xl w-full mx-auto p-6 relative z-50"
      >
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-xl font-bold text-gray-800">Passenger</h1>
          <div class="flex items-center gap-2">
            <button @click="clearInput" class="text-blue-500 font-medium">
              Clear
            </button>
            <button class="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            <button @click="openForm = false" class="ml-4 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="relative">
            <NotiDialog v-show="!checkName(tempFormData.firstName) && checkFirstName"  message="(a-z, A-Z) and Thai letters, with a maximum length of 50 characters!" />
            <input
              v-model="tempFormData.firstName"
              type="text"
              placeholder="Given names"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
            <button
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          <div class="relative">
            <NotiDialog v-show="!checkName(tempFormData.lastName) && checkLastName"  message="(a-z, A-Z) and Thai letters, with a maximum length of 50 characters!" />
            <input
              v-model="tempFormData.lastName"
              type="text"
              placeholder="Last name (surname)"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
            <button
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="mb-6 ml-1">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span class="ml-2 text-gray-500"
              >This passenger has no last name (surname)</span
            >
          </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="relative">
            <NotiDialog v-show="tempFormData.gender == '' && checkGender"  message="Please ensure that you enter a value in this field" />
            <select
              v-model="tempFormData.gender"
              class="appearance-none w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-400"
            >
              <option value="" disabled selected>Gender on ID</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div class="relative">
            <NotiDialog v-show="!checkDay(tempFormData.dob) && checkPastDate" message="Please enter a valid date of birth. The date should be in the past" />
            <input
              v-model="tempFormData.dob"
              type="text"
              placeholder="Date of birth"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-600"
              onfocus="this.type='date'"
              onblur="if(!this.value) this.type='text'"
            />
            
          </div>
          <div class="relative">
            <NotiDialog v-show="checkNationality"  message="Please ensure that you enter a value in this field" />
            <select
              v-model="tempFormData.nationality"
              class="appearance-none w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-400"
            >
              <option value="" disabled selected>Nationality</option>
              <option value="th">Thai</option>
              <option value="us">American</option>
              <option value="cn">Chinese</option>
              <option value="jp">Japanese</option>
              <option value="kr">Korean</option>
              <option value="sg">Singaporean</option>
              <option value="my">Malaysian</option>
              <option value="au">Australian</option>
              <option value="uk">British</option>
              <option value="other">Other</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <ul class="space-y-4 text-gray-700 font-light text-sm">
            <li class="flex">
              <span class="mr-2">•</span>
              <p>
                Please enter the name exactly as it appears on your travel
                documents for check-in. If the name is incorrect, you may not be
                able to board your flight and a cancellation fee will be
                charged.
              </p>
            </li>
            <li class="flex">
              <span class="mr-2">•</span>
              <p>
                To ensure your trip goes smoothly, please make sure that the
                passenger's travel document is valid for at least 6 months from
                the date the trip ends
              </p>
            </li>
          </ul>
        </div>
        <div class="flex justify-end items-center mb-6">
          <div class="flex items-center text-gray-700">
            <span>Frequent Flyer Program (Optional)</span>
            <button class="ml-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="saveForm"
            class="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-5"
      v-for="(passenger, index) in passengers"
      :key="index"
    >
      <div
        class="my-2 bg-white rounded-xl shadow-xs px-6 py-5 transition-all hover:shadow-md"
      >
        <h1
          v-if="
            !(
              formData[index].firstName &&
              formData[index].lastName &&
              formData[index].dob &&
              formData[index].nationality &&
              formData[index].gender
            )
          "
          class="text-lg font-semibold text-gray-800 mb-4"
        >
          Passenger {{ index + 1 }}
        </h1>
        <div
          v-if="
            formData[index].firstName &&
            formData[index].lastName &&
            formData[index].dob &&
            formData[index].nationality &&
            formData[index].gender
          "
          class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          <div
            class="bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white flex justify-between items-center"
          >
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <span class="font-bold">Boarding Pass</span>
            </div>
            <div class="text-xs bg-white/20 px-2 py-1 rounded-full">
              Passenger {{ index + 1 }}
            </div>
          </div>
          <div class="p-4">
            <div class="flex border-b border-dashed border-gray-200 pb-3 mb-3">
              <div class="w-1/2 pr-2">
                <p class="text-xs text-gray-500 uppercase">First Name</p>
                <p class="text-lg font-medium text-gray-800">
                  {{ formData[index].firstName }}
                </p>
              </div>
              <div class="w-1/2 pl-2">
                <p class="text-xs text-gray-500 uppercase">Last Name</p>
                <p class="text-lg font-medium text-gray-800">
                  {{ formData[index].lastName }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <p class="text-xs text-gray-500 uppercase">Gender</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ formData[index].gender }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 uppercase">Date of Birth</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ formData[index].dob }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 uppercase">Nationality</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ formData[index].nationality }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="bg-gray-50 border-t border-dashed border-gray-200 p-3 flex justify-between items-center text-xs text-gray-500"
          >
            <span>Booking Ref: ABC123</span>
            <span>Issue Date: {{ new Date().toLocaleDateString() }}</span>
          </div>
          <div class="relative -mt-1">
            <div
              class="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-white border border-gray-200"
            ></div>
            <div
              class="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-white border border-gray-200"
            ></div>
          </div>
        </div>
        <button
          @click="form(index)"
          class="py-3.5 w-full mt-5 bg-blue-50/50 text-sm text-blue-500 font-medium tracking-wide rounded-lg border border-blue-100 transition-colors hover:bg-blue-100 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        >
          Fill passenger information
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
