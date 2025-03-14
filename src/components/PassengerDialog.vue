<script setup>
import { ref, computed, defineEmits } from "vue";
const countAdult = ref(1);
const countChildren = ref(0);
const countInfact = ref(0);
const serviceType = ref(["Economy", " Business", "First Class"]);
const selectedServiceType = ref('Economy')
const openServiceType = ref(false)
const passengerLable = computed(() =>
  countAdult.value > 1 ? "Adults" : "Adult"
);

const finalPassenger = computed(() => {
    return countChildren.value > 0 || countInfact.value > 0
    ? ` ${countAdult.value + countInfact.value + countChildren.value} Passenger ${selectedServiceType.value}`
    : ` ${countAdult.value} ${passengerLable.value} ${selectedServiceType.value}`
})

const emits = defineEmits(['update:passenger'])


const updatePassenger = () => {
    emits('update:passenger', finalPassenger.value)
    console.log(finalPassenger.value);
    
}
</script>

<template>
  <div
    @click.stop="updatePassenger"
    class="bg-white w-[600px] text-xl p-8 rounded-lg tracking-wide"
  >
    <div
      class="flex flex-row justify-end items-center gap-1 text-xl mt-5 mb-5"
    >
      <i class="fa-solid fa-user"></i>
      <p>{{ `${countAdult} ${passengerLable}` }}</p>
      <p v-if="countChildren > 0">{{ `${countChildren} Children` }}</p>
      <p v-if="countInfact > 0">{{ `${countInfact} Infact` }}</p>
      <p>, {{ selectedServiceType }}</p>
    </div>
    <hr class="text-gray-200" />
    <p class="mt-5 mb-5 text-gray-500 font-light text-xl">
      Please select the exact number of passengers to view the best prices
    </p>
    <div class="flex flex-col gap-8">
      <div class="flex flex-row justify-between">
        <div>
          <p>Adults</p>
          <p class="text-sm text-gray-500 font-light">12+ years old</p>
        </div>
        <div class="flex flex-row gap-5">
          <button @click="countAdult--" :disabled="countAdult <= 1">
            <i :class="countAdult <= 1 ? 'text-4xl fa-solid fa-square-minus text-gray-300' : 'text-4xl fa-solid fa-square-minus text-blue-500' "></i>
          </button>
          <p class="w-[25px] flex justify-center items-center">
            {{ countAdult }}
          </p>
          <button @click="countAdult++" :disabled="countAdult + countChildren === 9">
            <i :class="countAdult + countChildren === 9 ? 'text-4xl fa-solid fa-square-plus text-gray-300' : 'text-4xl fa-solid fa-square-plus text-blue-500' "></i>
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>
          <p>2-11 years old</p>
          <p class="text-sm text-gray-500 font-light">12+ years old</p>
        </div>
        <div class="flex flex-row gap-5">
          <button @click="countChildren--" :disabled="countChildren <= 0">
            <i :class="countChildren <= 0 ? 'text-4xl fa-solid fa-square-minus text-gray-300' : 'text-4xl fa-solid fa-square-minus text-blue-500' "></i>
          </button>
          <p class="w-[25px] flex justify-center items-center">
            {{ countChildren }}
          </p>
          <button @click="countChildren++" :disabled="countAdult + countChildren === 9">
            <i :class="countAdult + countChildren === 9 ? 'text-4xl fa-solid fa-square-plus text-gray-300' : 'text-4xl fa-solid fa-square-plus text-blue-500' "></i>
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>
          <p>Under 2 years old</p>
          <p class="text-sm text-gray-500 font-light">12+ years old</p>
        </div>
        <div class="flex flex-row gap-5">
          <button @click="countInfact--" :disabled="countInfact <= 0">
            <i :class="countInfact <= 0 ? 'text-4xl fa-solid fa-square-minus text-gray-300' : 'text-4xl fa-solid fa-square-minus text-blue-500' "></i>
          </button>
          <p class="w-[25px] flex justify-center items-center">
            {{ countInfact }}
          </p>
          <button @click="countInfact++" :disabled="countInfact >= 4" >
            <i :class=" countInfact >= 4 ? 'text-4xl fa-solid fa-square-plus text-gray-300' : 'text-4xl fa-solid fa-square-plus text-blue-500' "></i>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-10 font-light">
      <button class="rounded-md border-gray-400 border-1 w-[100%] flex justify-between p-3 px-5 items-center font-normal" @click.stop="openServiceType = !openServiceType">
        <p>{{selectedServiceType}}</p>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <ul class="p-3 px-5 flex gap-2.5 flex-col bg-white shadow-lg rounded-lg" v-show="openServiceType">
        <li @click="selectedServiceType = service; openServiceType = !openServiceType" v-for="service in serviceType" :value="service" :key="service">{{ service }}</li>
      </ul>
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
