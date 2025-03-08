<script setup>
import { ref } from "vue";
import Calendar from "./Calender.vue";
import Adult from "./Adult.vue";
import Destination from "./Destination.vue";
const current = new Date().toLocaleDateString();

const showCalendar = ref(false);
const showAdult = ref(false);
const showLeaving = ref(false);
const showGoing = ref(false);

const arrShow = ref([showCalendar, showAdult, showGoing, showLeaving]);

const closeToggles = (show) => {
  arrShow.value.forEach((element) => {
    show !== element;
    element.value = false;
  });
};

const toggleCalendar = () => {
  closeToggles("showCalendar");
  showCalendar.value = !showCalendar.value;
};

const toogleAdult = () => {
  closeToggles("showAdult");
  showAdult.value = !showAdult.value;
};

const toggleLeaving = () => {
  closeToggles("showLeaving");
  showLeaving.value = !showLeaving.value;
};

const toggleGoing = () => {
  closeToggles("showGoing");
  showGoing.value = !showGoing.value;
};
</script>

<template>
  <div class="bg-white text-black h-auto pt-15 pb-5 px-10">
    <div class="flex flex-row gap-5 font-light">
      <div class="hover:bg-gray-100 px-3 pt-2 pb-1 transition-all duration-300">
        <input
          class=""
          type="radio"
          name="type"
          id="round-trip"
          value="Round Trip"
        />
        <label class="ml-2 text-bold text-xl" for="round-trip"
          >Round Trip</label
        >
      </div>
      <div class="hover:bg-gray-100 px-3 pt-2 pb-1 transition-all duration-300">
        <input type="radio" name="type" id="one-way" value="One Way" />
        <label class="ml-2 text-bold text-xl" for="one-way">One way</label>
      </div>
    </div>
    <div class="flex flex-row mt-2 gap-2 justify-between">
      <div class="">
        <button
          @click="toggleLeaving"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          Leaving
        </button>
        <Destination class="absolute" v-if="showLeaving"></Destination>
      </div>
      <div>
        <button
          @click="toggleGoing"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          Going to
        </button>
        <Destination class="absolute" v-if="showGoing"></Destination>
      </div>
      <div>
        <button
          @click="toggleCalendar"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          {{ current }}
        </button>
        <Calendar v-if="showCalendar"></Calendar>
      </div>
      <div>
        <button
          @click="toogleAdult"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          1 Adult, Economy
        </button>
        <Adult v-if="showAdult"></Adult>
      </div>
    </div>
    <div class="flex flex-row gap-5 justify-end mt-5">
      <div>
        <button
          class="border-2 border-blue-600 rounded-lg p-5 text-2xl font-light text-blue-600"
        >
          Flight + Hotel
        </button>
      </div>
      <div>
        <button
          class="border-2 border-blue-600 bg-blue-600 rounded-lg text-2xl font-light p-5 text-white"
        >
          <i class="fa-solid fa-magnifying-glass mr-3"></i>Search
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Raleway";
}
@media (min-width: 1024px) {
}
</style>
