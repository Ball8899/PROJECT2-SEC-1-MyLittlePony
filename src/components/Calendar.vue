<script setup>
import {
  ref,
  watch,
  computed,
  defineProps,
  watchEffect,
  defineEmits,
} from "vue";
const emit = defineEmits(["updateCalendar"]);

const props = defineProps({
  typeFlight: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
});
const selectionType = ref("depart");

const handleType = (type) => {
  selectionType.value = type;
  if (type === "One Way") {
  }
};

const currentDate = ref(new Date());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());
const selectionStart = ref(new Date(props.startDate));
const selectionEnd = ref(new Date(props.endDate));
const isDragging = ref(false);
const hoverDate = ref(null);

watch([currentMonth, currentYear, selectionEnd, selectionStart], () => {
  emit("updateCalendar", {
    start: selectionStart.value,
    end: selectionEnd.value,
  });
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
  if (!date || !selectionStart.value || props.typeFlight === "One Way")
    return false;

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

  if (props.typeFlight === "One Way") {
    selectionStart.value = date;
    selectionEnd.value = null;
    isDragging.value = false;
  } else {
    if (selectionType.value === "depart") {
      selectionStart.value = date;
      if (
        selectionEnd.value &&
        selectionEnd.value.getTime() < selectionStart.value.getTime()
      ) {
        [selectionStart.value, selectionEnd.value] = [
          selectionEnd.value,
          selectionStart.value,
        ];
      }
    } else if (selectionType.value === "return") {
      if (
        !selectionStart.value ||
        date.getTime() < selectionStart.value.getTime()
      ) {
        selectionStart.value = date;
      } else {
        selectionEnd.value = date;
      }
      if (
        selectionEnd.value &&
        selectionEnd.value.getTime() < selectionStart.value.getTime()
      ) {
        [selectionStart.value, selectionEnd.value] = [
          selectionEnd.value,
          selectionStart.value,
        ];
      }
    }
  }
};

const handleMouseMove = (date) => {
  if (!date || props.typeFlight === "One Way") return;

  hoverDate.value = date;
  if (isDragging.value && selectionStart.value) {
    selectionEnd.value = date;
  }
};

const handleMouseUp = (date) => {
  if (!date || !selectionStart.value || props.typeFlight === "One Way") return;

  isDragging.value = false;

  if (selectionType.value === "return") {
    if (
      !selectionEnd.value ||
      date.getTime() > selectionStart.value.getTime()
    ) {
      selectionEnd.value = date;
    }
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
      isInRange: false,
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
      isInRange: isDateInRange(date),
    });
  }

  return days;
};

const currentMonthDays = computed(() => {
  return createCalendarDays(currentYear.value, currentMonth.value, true);
});

const nextMonthDays = computed(() => {
  const nextMonth = (currentMonth.value + 1) % 12;
  const nextYear =
    currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;
  return createCalendarDays(nextYear, nextMonth, false);
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

const isFinishDay = ref(false)

watch(selectionEnd, (newEnd, oldEnd) => {
  if (newEnd) {
    console.log('newEnd:', newEnd);
    console.log((`test ${isFinishDay.value}`));
    
    isFinishDay.value = true
  }
})

const handleClick = (event) => {
  if (selectionType.value === "depart" && props.typeFlight === "Round Trip") {
    event.stopPropagation();
  }
  
  if (selectionType.value === "return" && props.typeFlight === "Round Trip" && isFinishDay.value === true) {
    return
    
  }

  if (selectionType.value === "return" && props.typeFlight === "Round Trip" && isFinishDay.value === false) {
     event.stopPropagation();
  } else if (selectionType.value === "depart" && props.typeFlight === "One Way") {
    return
  }

};
</script>

<template>
  <div
  @click="handleClick"
    class="font-xs bg-white w-[75%] py-0 shadow-lg -mt-15 rounded-2xl select-none"
  >
    <div class="flex flex-row justify-end gap-15 py px-5">
      <div
        :class="
          selectionType === 'depart'
            ? 'border-b-5 border-b-blue-500 text-black'
            : ''
        "
      >
        <button @click="handleType('depart')" class="py-2">
          <p class="text-gray-500 text-sm font-light text-right mb-1">Depart</p>
          <p class="font-light text-sm">
            {{
              selectionStart.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}
          </p>
        </button>
      </div>

      <div
        :class="
          selectionType === 'return'
            ? 'border-b-5 border-b-blue-500 text-black'
            : ''
        "
        v-if="props.typeFlight === 'Round Trip'"
      >
        <button @click="handleType('return')" class="py-2">
          <p class="text-gray-500 text-sm font-light text-right mb-1">Return</p>
          <p class="font-light text-sm" v-if="props.typeFlight !== 'One Way'">
            {{
              selectionEnd.toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}
          </p>
        </button>
      </div>
    </div>
    <hr class="text-gray-200 mb-6" />
    <div class="flex flex-row justify-between px-10">
      <button @click="previousMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <h3 class="text-center text-[16px] font-semibold">
        {{
          new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })
        }}
        {{ currentYear }}
      </h3>
      <div class="px-8"></div>
      <h3 class="text-center text-[16px] font-semibold">
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
        <div class="grid grid-cols-7 gap-0.5 justify-items-center">
          <div
            v-for="(day, index) in shortWeekdays"
            :key="index"
            class="w-12 h-12 text-[12px] flex items-center justify-center"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-0.5 justify-items-center">
          <div
            v-for="(day, index) in currentMonthDays"
            :key="index"
            :class="[
              'w-11 h-11 flex text-[14.5px] font-medium items-center justify-center rounded-xs',
              day.day ? 'cursor-pointer' : '',
              day.isSelectionStart ||
              (day.isSelectionEnd && props.typeFlight !== 'One Way')
                ? 'bg-blue-600 text-white'
                : day.isInRange
                ? 'bg-blue-100'
                : 'hover:bg-blue-100',
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
        <div class="grid grid-cols-7 gap-0.5 text-center justify-items-center">
          <div
            v-for="(day, index) in shortWeekdays"
            :key="index"
            class="w-12 h-12 text-[12px] flex items-center justify-center"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-0.5 justify-items-center">
          <div
            v-for="(day, index) in nextMonthDays"
            :key="index"
            :class="[
              'w-11 h-11 flex text-[14.5px] font-medium items-center justify-center rounded-xs',
              day.day ? 'cursor-pointer' : '',
              day.isSelectionStart ||
              (day.isSelectionEnd && typeFlight !== 'One Way')
                ? 'bg-blue-600 text-white'
                : day.isInRange
                ? 'bg-blue-100'
                : 'hover:bg-blue-100',
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
  </div>
</template>
