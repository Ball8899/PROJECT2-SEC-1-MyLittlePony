<script setup>
import { ref, computed } from 'vue';

const currentDate = ref(new Date());

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

const generateCalendar = computed(() => {
  const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value);
  const firstDay = getFirstDayOfMonth(currentMonth.value, currentYear.value);

  let daysArray = new Array(firstDay).fill(null);

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return daysArray;
});

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1);
};
</script>

<template>
  <div class="calendar-container bg-white w-[300px] h-[300px] border p-4 rounded-lg">
    <div class="flex justify-between mb-4">
      <button @click="previousMonth" class="bg-gray-300 p-2 rounded">Previous</button>
      <span class="text-xl">
        {{ currentDate.value.toLocaleString('default', { month: 'long' }) }} {{ currentYear }}
      </span>
      <button @click="nextMonth" class="bg-gray-300 p-2 rounded">Next</button>
    </div>

    <!-- Days of the Week -->
    <div class="grid grid-cols-7 gap-2 text-center mb-2">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>

    <!-- Calendar Days -->
    <div class="grid grid-cols-7 gap-2">
      <div v-for="(day, index) in generateCalendar" :key="index" class="text-center">
        <span v-if="day" class="inline-block w-8 h-8 rounded-full hover:bg-gray-200 cursor-pointer">
          {{ day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  font-family: "Raleway", sans-serif;
}

button {
  cursor: pointer;
}

button:hover {
  background-color: #b8b8b8;
}

.grid {
  display: grid;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, 1fr);
}

.gap-2 {
  gap: 0.5rem;
}

.text-center {
  text-align: center;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.rounded-full {
  border-radius: 9999px;
}

.hover\:bg-gray-200:hover {
  background-color: #e5e7eb;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
