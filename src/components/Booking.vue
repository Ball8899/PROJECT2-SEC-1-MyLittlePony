<script setup>
import { ref, defineProps, watch, defineEmits} from "vue";
import Calendar from "./Calender.vue";
import Adult from "./Adult.vue";
import Destination from "./Destination.vue";
const current = new Date().toLocaleDateString();

const emits = defineEmits(['update'])

const showToggleProp = defineProps({
  showToggle: {
    type: Boolean,
  }
})


const showCalendar = ref(false)
const showAdult = ref(false)
const showLeaving = ref(false)
const showGoing = ref(false)

watch(() => showToggleProp.showToggle, () => {
  if (showToggleProp.showToggle === true) {
      manageToggles('')
  }
})

const arrShow = ref([
  { name: "showCalendar", value: showCalendar },
  { name: "showAdult", value: showAdult },
  { name: "showLeaving", value: showLeaving },
  { name: "showGoing", value: showGoing },
]);

const manageToggles = (show) => {
  arrShow.value.forEach((element) => {
    element.value = element.name === show ? !element.value : false;
  });
};

const toggle = (nameDialog) => {
  emits('update')
  manageToggles(nameDialog);
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
          @click.stop="toggle('showLeaving')" 
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          Leaving
        </button>
        <Destination class="absolute" v-if="showLeaving"></Destination>
      </div>
      <div>
        <button
          @click.stop="toggle('showGoing')"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          Going to
        </button>
        <Destination class="absolute" v-if="showGoing"></Destination>
      </div>
      <div>
        <button
          @click.stop="toggle('showCalendar')"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          {{ current }}
        </button>
        <Calendar class="absolute" v-if="showCalendar"></Calendar>
      </div>
      <div>
        <button
          @click.stop="toggle('showAdult')"
          class="w-[290px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md"
        >
          1 Adult, Economy
        </button>
        <Adult class="absolute" v-if="showAdult"></Adult>
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
