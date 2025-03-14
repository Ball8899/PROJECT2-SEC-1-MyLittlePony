<script setup>
import { ref, computed } from "vue";
const currentDate = ref(new Date());
const departDate = ref(new Date());
const returnDate = ref(new Date());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());
const selectedDate = ref()
const selectedDateFn = (day) => {
  selectedDate.value = day
  console.log(selectedDate.value)
}

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month).getDay();

const createCalendarFirst = computed(() => {
  const daysInMonth = getDaysInMonth(currentYear.value, currentMonth.value);
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);

  let daysArray = new Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }
  return daysArray;
});

const createCalendarLast = computed(() => {
  const daysInMonth = getDaysInMonth(currentYear.value, currentMonth.value + 1);
  const firstDay = getFirstDayOfMonth(
    currentYear.value,
    currentMonth.value + 1
  );

  let daysArray = new Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }
  return daysArray;
});

const previousMonth = () => {
  const newDate = new Date(currentYear.value, currentMonth.value - 1, 1);
  currentDate.value = newDate;
};

const nextMonth = () => {
  const newDate = new Date(currentYear.value, currentMonth.value + 1, 1);
  currentDate.value = newDate;
};
</script>

<template>
  <div @click.stop class="bg-white h-[300px] p-4 rounded-lg text-black text-lg">
    <div class="flex flex-row justify-end font-light">
      <button class="p-3">
        <p class="text-gray-500">Depart</p>
        {{
          departDate.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        }}
      </button>
      <button class="p-3">
        <p class="text-gray-500">Return</p>
        {{
          returnDate.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        }}
      </button>
    </div>
    <hr class="text-gray-200" />
    <div class="flex flex-row justify-between p-5">
      <div>
        <h3 class="text-2xl font-semibold">Select flexible departure dates</h3>
      </div>
      <div class="flex">
        <button class="px-5">
          {{
            departDate.toLocaleString("en-US", {
              month: "short",
            })
          }}
        </button>
        <button class="pl-5">
          {{
            returnDate.toLocaleString("en-US", {
              month: "short",
            })
          }}
        </button>
      </div>
    </div>
    <hr class="text-gray-200" />
    <div class="flex justify-between mb-4">
      <button @click="previousMonth" class="items-start">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div class="flex p-5 gap-10">
        <div>
          <p class="text-center m-4 text-md text-blue-800 font-semibold">
            {{
              new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })
            }}
            {{ currentYear }}
          </p>
          <div class="grid grid-cols-7 gap-2 text-center mb-2 font-light">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="(day, index) in createCalendarFirst"
              :key="index"
              class="text-center"
            >
              <p 
                @click="selectedDateFn(day)"
                v-if="day"
                :class="{
                   'bg-blue-500 text-white': selectedDate === day
                }"
                class="font-semibold flex justify-center items-center w-14 h-14  rounded-lg hover:bg-blue-200 cursor-pointer"
              >
                {{ day }}
          </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-center m-4 text-md text-blue-800 font-semibold">
            {{
              new Date(currentYear, currentMonth + 1).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )
            }}
            {{ currentYear }}
          </p>
          <div class="grid grid-cols-7 gap-2 text-center mb-2 font-light">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="(day, index) in createCalendarLast"
              :key="index"
              class="text-center"
            >
              <p
                v-if="day"
                class="font-semibold flex justify-center items-center w-14 h-14 rounded-lg hover:bg-blue-200 cursor-pointer"
              >
                {{ day }}
          </p>
            </div>
          </div>
        </div>
      </div>
      <button @click="nextMonth">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
