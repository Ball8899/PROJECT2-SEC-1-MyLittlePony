<template>
  <div class="w-[55%] m-auto py-20 shadow-lg mt-20 rounded-2xl select-none">
    <div class="flex flex-row justify-between px-10">
      <button @click="previousMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <h3 class="text-center font-semibold">
        {{
          new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })
        }}
        {{ currentYear }}
      </h3>
      <div class="px-8"></div>
      <h3 class="text-center font-semibold">
        {{
          new Date(currentYear, currentMonth + 1).toLocaleString("default", {
            month: "long",
          })
        }}
        {{ currentMonth === 11 ? currentYear + 1 : currentYear }}
      </h3>
      <button @click="nextMonth">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="grid grid-cols-2 py-5 justify-items-center px-10 gap-10">
      <div class="w-[100%]">
        <div class="grid grid-cols-7 gap-1 text-center justify-items-center">
          <div
            v-for="(day, index) in shortWeekdays"
            :key="index"
            class="w-12 h-12 flex items-center justify-center"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 justify-items-center">
          <div
            v-for="(day, index) in currentMonthDays"
            :key="index"
            :class="[
              'w-12 h-12 flex items-center justify-center text-sm rounded-lg',
              day.day ? 'cursor-pointer' : '',
              day.isSelectionStart || day.isSelectionEnd ? 
                'bg-blue-600 text-white' : 
                day.isInRange ? 
                  'bg-blue-100' : 
                  'hover:bg-gray-100'
            ]"
            @mousedown="day.date && handleMouseDown(day.date)"
            @mousemove="day.date && handleMouseMove(day.date)"
            @mouseup="day.date && handleMouseUp(day.date)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
      <div class="w-[100%]">
        <div class="grid grid-cols-7 gap-1 text-center justify-items-center">
          <div
            v-for="(day, index) in shortWeekdays"
            :key="index"
            class="w-12 h-12 flex items-center justify-center"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1 justify-items-center">
          <div
            v-for="(day, index) in nextMonthDays"
            :key="index"
            :class="[
              'w-12 h-12 flex items-center justify-center text-sm rounded-lg',
              day.day ? 'cursor-pointer' : '',
              day.isSelectionStart || day.isSelectionEnd ? 
                'bg-blue-600 text-white' : 
                day.isInRange ? 
                  'bg-blue-100' : 
                  'hover:bg-gray-100'
            ]"
            @mousedown="day.date && handleMouseDown(day.date)"
            @mousemove="day.date && handleMouseMove(day.date)"
            @mouseup="day.date && handleMouseUp(day.date)"
          >
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="selectionStart || selectionEnd" class="mt-6 px-10 text-center">
      <p class="text-sm text-gray-600">
        Selected Range: {{ selectionStart?.toLocaleDateString() }} 
        {{ selectionEnd ? `- ${selectionEnd?.toLocaleDateString()}` : '' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const currentDate = ref(new Date());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());
const selectionStart = ref(null);
const selectionEnd = ref(null);
const isDragging = ref(false); 
const hoverDate = ref(null);

watch([currentMonth, currentYear], () => {
  selectionStart.value = null;
  selectionEnd.value = null;
  hoverDate.value = null;
  isDragging.value = false;
});

const isDateSelectionStart = (date) => {
  if (!date || !selectionStart.value) return false;

  return (
    date.getDate() === selectionStart.value.getDate() &&
    date.getMonth() === selectionStart.value.getMonth() &&
    date.getFullYear() === selectionStart.value.getFullYear()
  );
};

const isDateSelectionEnd = (date) => {
  if (!date || !selectionEnd.value) return false;

  return (
    date.getDate() === selectionEnd.value.getDate() &&
    date.getMonth() === selectionEnd.value.getMonth() &&
    date.getFullYear() === selectionEnd.value.getFullYear()
  );
};

const isDateInRange = (date) => {
  if (!date || !selectionStart.value) return false;

  const end = selectionEnd.value || hoverDate.value;
  if (!end) return false;

  const startTime = selectionStart.value.getTime();
  const endTime = end.getTime();
  const dateTime = date.getTime();

  return (
    (startTime < dateTime && dateTime < endTime) ||
    (endTime < dateTime && dateTime < startTime)
  );
};

const handleMouseDown = (date) => {
  if (!date) return;
  
  selectionStart.value = date;
  selectionEnd.value = null;
  isDragging.value = true;
};

const handleMouseMove = (date) => {
  if (!date) return;
  
  hoverDate.value = date;
  
  if (isDragging.value && selectionStart.value) {
    selectionEnd.value = date;
  }
};

const handleMouseUp = (date) => {
  if (!date || !selectionStart.value) return;
  
  isDragging.value = false;
  if (date.getTime() < selectionStart.value.getTime()) {
    selectionEnd.value = selectionStart.value;
    selectionStart.value = date;
  } else {
    selectionEnd.value = date;
  }
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const shortWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const createCalendarDays = (year, month, isCurrentMonth) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({
      day: null,
      month,
      year,
      date: null,
      isCurrentMonth,
      isSelected: false,
      isSelectionStart: false,
      isSelectionEnd: false,
      isInRange: false
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      month,
      year,
      date,
      isCurrentMonth,
      isSelectionStart: isDateSelectionStart(date),
      isSelectionEnd: isDateSelectionEnd(date),
      isInRange: isDateInRange(date)
    });
  }

  return days;
};

const currentMonthDays = computed(() => {
  return createCalendarDays(currentYear.value, currentMonth.value, true);
});

const nextMonthDays = computed(() => {
  const nextMonth = (currentMonth.value + 1) % 12;
  const nextYear = currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;
  return createCalendarDays(nextYear, nextMonth, false);
});

const handleGlobalMouseUp = () => {
  if (isDragging.value) {
    isDragging.value = false;
  }
};

onMounted(() => {
  window.addEventListener('mouseup', handleGlobalMouseUp);
});

onUnmounted(() => {
  window.removeEventListener('mouseup', handleGlobalMouseUp);
});

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value,
    (currentMonth.value + 1) % 12,
    1
  );
};
</script>