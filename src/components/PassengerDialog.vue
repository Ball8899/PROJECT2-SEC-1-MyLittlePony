<script setup>
import { ref, computed, defineEmits, defineProps } from "vue";
const props = defineProps({
  passenger: {
    type: Object
  }
})

const countAdult = ref(props.passenger.adult);
const countChildren = ref(props.passenger.children);
const countInfant = ref(props.passenger.infant);
const serviceType = ref(["Economy", " Business", "First Class"]);
const selectedServiceType = ref('Economy')
const openServiceType = ref(false)
const passengerLable = computed(() =>
  countAdult.value > 1 ? "Adults" : "Adult"
);


const dataPassenger = computed(() => {
  return {
    adult: countAdult.value,
    children: countChildren.value,
    infant: countInfant.value,
    class: selectedServiceType.value
  }
})

const emits = defineEmits(['updatePassenger'])


const updatePassenger = () => {
    emits('updatePassenger', dataPassenger.value)
}
</script>

<template>
  <div
    @click.stop="updatePassenger"
    class="shadow-xl bg-white w-[450px] text-sm p-8 rounded-lg tracking-wide"
  >
    <div
      class="flex flex-row justify-end items-center gap-1 -mt-5 text-base mb-3"
    >
      <i class="fa-solid fa-user"></i>
      <p>{{ `${countAdult} ${passengerLable}` }}</p>
      <p v-if="countChildren > 0">{{ `${countChildren} Children` }}</p>
      <p v-if="countInfant > 0">{{ `${countInfant} Infact` }}</p>
      <p>, {{ selectedServiceType }}</p>
    </div>
    <hr class="text-gray-200" />
    <p class="mt-3 mb-4 text-gray-500 font-light">
      Please select the exact number of passengers to view the best prices
    </p>
    <div class="flex flex-col gap-6">
      <div class="flex flex-row justify-between">
        <div>
          <p class="font-semibold">Adults</p>
          <p class="text-sm text-gray-500 font-light">12+ years old</p>
        </div>
        <div class="flex flex-row gap-5">
          <button @click="countAdult--" :disabled="countAdult <= 1">
            <i :class="countAdult <= 1 ? 'text-3xl fa-solid fa-square-minus text-gray-300' : 'text-3xl fa-solid fa-square-minus text-blue-500' "></i>
          </button>
          <p class="w-[12px] flex justify-center items-center">
            {{ countAdult }}
          </p>
          <button @click="countAdult++" :disabled="countAdult + countChildren === 9">
            <i :class="countAdult + countChildren === 9 ? 'text-3xl fa-solid fa-square-plus text-gray-300' : 'text-3xl fa-solid fa-square-plus text-blue-500' "></i>
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>
          <p class="font-semibold">2-11 years old</p>
          <p class="text-sm text-gray-500 font-light">12+ years old</p>
        </div>
        <div class="flex flex-row gap-5">
          <button @click="countChildren--" :disabled="countChildren <= 0">
            <i :class="countChildren <= 0 ? 'text-3xl fa-solid fa-square-minus text-gray-300' : 'text-3xl fa-solid fa-square-minus text-blue-500' "></i>
          </button>
          <p class="w-[12px] flex justify-center items-center">
            {{ countChildren }}
          </p>
          <button @click="countChildren++" :disabled="countAdult + countChildren === 9">
            <i :class="countAdult + countChildren === 9 ? 'text-3xl fa-solid fa-square-plus text-gray-300' : 'text-3xl fa-solid fa-square-plus text-blue-500' "></i>
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>
          <p class="font-semibold">Under 2 years old</p>
          <p class="text-sm text-gray-500 font-light">12+ years old</p>
        </div>
        <div class="flex flex-row gap-5">
          <button @click="countInfant--" :disabled="countInfant <= 0">
            <i :class="countInfant <= 0 ? 'text-3xl fa-solid fa-square-minus text-gray-300' : 'text-3xl fa-solid fa-square-minus text-blue-500' "></i>
          </button>
          <p class="w-[12px] flex justify-center items-center">
            {{ countInfant }}
          </p>
          <button @click="countInfant++" :disabled="countInfant >= 4" >
            <i :class=" countInfant >= 4 ? 'text-3xl fa-solid fa-square-plus text-gray-300' : 'text-3xl fa-solid fa-square-plus text-blue-500' "></i>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5 font-light">
      <button class="rounded-md border-gray-400 border-1 w-[100%] flex justify-between p-2 px-5 items-center font-normal" @click.stop="openServiceType = !openServiceType">
        <p>{{selectedServiceType}}</p>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <ul class="absolute w-[85%] p-3 px-5 flex gap-2.5 flex-col bg-white shadow-lg rounded-lg" v-show="openServiceType">
        <li @click="selectedServiceType = service; openServiceType = !openServiceType" v-for="service in serviceType" :value="service" :key="service">{{ service }}</li>
      </ul>
    </div>
    <div class="flex justify-end pt-3">
      <button class="px-5 py-2 rounded-lg bg-blue-600 text-white">Search</button>
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
