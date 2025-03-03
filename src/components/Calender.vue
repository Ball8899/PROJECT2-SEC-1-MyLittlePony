<script setup>
import { ref, computed } from 'vue'
const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay()

const createCalendar = computed(() => {
    const daysInMonth = getDaysInMonth(currentYear.value, currentMonth.value)
    const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value)

    let daysArray = new Array(firstDay).fill(null)
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i)
    }
    return daysArray
})

const previousMonth = () => {
    const newDate = new Date(currentYear.value, currentMonth.value - 1, 1)
    currentDate.value = newDate
}

const nextMonth = () => {
    const newDate = new Date(currentYear.value, currentMonth.value + 1, 1)
    currentDate.value = newDate
}
</script>

<template>
  <div class="calendar-container bg-white w-[300px] h-[300px] border p-4 rounded-lg text-black">
    <div class="flex justify-between mb-4">
      <button @click="previousMonth" class="bg-gray-300 p-2 rounded">Previous</button>
      <span class="text-xl">
        {{ new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' }) }} {{ currentYear }}
      </span>
      <button @click="nextMonth" class="bg-gray-300 p-2 rounded">Next</button>
    </div>

    <div class="grid grid-cols-7 gap-2 text-center mb-2">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="(day, index) in createCalendar" :key="index" class="text-center">
        <span v-if="day" class="inline-block w-8 h-8 rounded-full hover:bg-gray-200 cursor-pointer">
          {{ day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
