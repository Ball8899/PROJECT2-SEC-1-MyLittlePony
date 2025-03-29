<script setup>
import {
  ref,
  defineProps,
  watch,
  defineEmits,
  computed,
  watchEffect,
} from "vue";
import CalendarDialog from "./Calendar.vue";
import DestinationDialog from "./DestinationDialog.vue";
import PassengerDialog from "./PassengerDialog.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formatDate = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const typeOfFlight = ref("One Way");

watch(() => {
  if (typeOfFlight.value === "Round Trip") {
    if (returnFlight.value === null) {
      returnFlight.value = new Date(departFlight.value);
      returnFlight.value.setDate(returnFlight.value.getDate() + 1);
    }
  }
});

const searchFlight = () => {
  if (checkNotValidLocation() || (goingDestination.value == '' || leavingDestination.value == '')) {
    return
  }
  if (typeOfFlight.value == 'Round Trip' && returnFlight.value === null) {
    return
  }
  router.push({
    name: "listFlight",
    query: {
      type: typeOfFlight.value,
      departFlight: formatDate(departFlight.value),
      returnFlight: formatDate(returnFlight.value),
      goingDestination: goingDestination.value,
      leavingDestination: leavingDestination.value,
      passenger: passengerCount.value,
    },
  });
};

const leavingDestination = ref("");
const goingDestination = ref("");

const reverseLocation = () => {
  const tempGogin = goingDestination.value;
  goingDestination.value = leavingDestination.value;
  leavingDestination.value = tempGogin;
};
const departFlight = ref(new Date());
const returnFlight = ref(null);

const passenger = ref({
  adult: 1,
  children: 0,
  infant: 0,
  class: "Economy",
});

const passengerCount = computed(() => {
  return (
    passenger.value.adult + passenger.value.children + passenger.value.infant
  );
});

const passengerLable = computed(() => {
  if (passenger.value.children > 0 || passenger.value.infant > 0)
    return `Passengers`;
  else if (passenger.value.adult > 1) return `Adults`;
  else if ((passenger.value.adult = 1)) return `Adult`;
  return `Adult`;
});

const handlePassenger = (data) => {
  passenger.value = data;
};

const handleDate = (data) => {
  departFlight.value = data.start;
  returnFlight.value = data.end;
};

const handleDestination = (data) => {
  if (data.type === "leaving") {
    leavingDestination.value = data.value;
  } else if (data.type === "going") {
    goingDestination.value = data.value;
  }
  return true;
};

const emits = defineEmits(["update"]);

const showToggleProp = defineProps({
  showToggle: {
    type: Boolean,
  },
});

const showCalendar = ref(false);
const showAdult = ref(false);
const showLeaving = ref(false);
const showGoing = ref(false);

const checkNotValidLocation = () => {
  if (leavingDestination.value === "" && goingDestination.value === "")
    return false;
  return leavingDestination.value === goingDestination.value;
};

watchEffect(() => {
  checkNotValidLocation();
});

watch(
  () => showToggleProp.showToggle,
  () => {
    if (showToggleProp.showToggle === true) {
      manageToggles("");
    }
  }
);

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
  emits("update");
  manageToggles(nameDialog);
};
</script>

<template>
  <div class="bg-white text-black h-auto pt-10 pb-5 rounded-lg">
    <div class="flex flex-row gap-5 font-light">
      <div
        class="hover:bg-gray-100 px-3 pt-2 pb-1 ml-2 transition-all duration-300"
      >
        <input
          class=""
          type="radio"
          name="type"
          id="round-trip"
          value="Round Trip"
          v-model="typeOfFlight"
        />
        <label class="ml-2 text-bold text-base" for="round-trip"
          >Round Trip</label
        >
      </div>
      <div class="hover:bg-gray-100 px-3 pt-2 pb-1 transition-all duration-300">
        <input
          type="radio"
          name="type"
          checked
          id="one-way"
          value="One Way"
          v-model="typeOfFlight"
        />
        <label class="ml-2 text-bold text-base" for="one-way">One way</label>
      </div>
    </div>
    <div class="flex flex-row px-5 mt-2 gap-1 justify-between">
      <div class="">
        <button
          @click.stop="toggle('showLeaving')"
          class="w-[240px] text-left text-sm font-semibold border-1 border-gray-300 rounded-md px-1 py-1"
          :class="
            leavingDestination != ''
              ? 'text-gray-800'
              : 'text-gray-300  px-2 py-4'
          "
        >
          <div
            :class="
              leavingDestination != ''
                ? 'bg-blue-100/80 rounded-sm w-[100%] pr-6 pl-3 py-1'
                : ''
            "
          >
            <p class="pl-3">
              {{ leavingDestination || "" ? leavingDestination : "Leaving" }}
            </p>
            <p
              v-show="leavingDestination != ''"
              class="text-xs pl-3 font-light"
            >
              All airports
            </p>
          </div>
        </button>
        <DestinationDialog
          @destination-selected="handleDestination"
          :type="'leaving'"
          class="w-[550px] absolute -mt-14"
          v-if="showLeaving"
        ></DestinationDialog>
      </div>
      <div>
        <div v-show="checkNotValidLocation()">
          <p
            class="absolute -mt-12 bg-red-600/85 font-light tracking-wide px-2 py-2 w-[250px] text-xs text-white"
          >
            Please select different departure and arrival cities
          </p>
          <span
            class="w-0 h-0 ml-5 absolute border-t-8 border-t-red-600/85 border-l-8 border-l-transparent border-r-8 border-r-transparent"
          ></span>
        </div>
        <button
          @click="reverseLocation"
          class="w-10 absolute bg-white border-1 border-gray-300 -ml-5 mt-1.5 rounded-full flex justify-center items-center h-10"
        >
          <img
            src="../assets/image/airplanes-and-arrows-symbol-svgrepo-com.svg"
            class="w-6 h-6"
            alt=""
          />
        </button>
      </div>
      <div>
        <button
          @click.stop="toggle('showGoing')"
          class="w-[240px] text-left text-sm font-semibold border-1 border-gray-300 rounded-md px-1 py-1"
          :class="
            goingDestination != ''
              ? 'text-gray-800'
              : 'text-gray-300  px-2 py-4'
          "
        >
          <div
            :class="
              goingDestination != ''
                ? 'bg-blue-100/80 rounded-sm  w-[100%] pr-6 pl-3 py-1'
                : ''
            "
          >
            <p class="pl-3">
              {{ goingDestination || "" ? goingDestination : "Going to" }}
            </p>
            <p v-show="goingDestination != ''" class="text-xs pl-3 font-light">
              All airports
            </p>
          </div>
        </button>
        <DestinationDialog
          @destination-selected="handleDestination"
          :type="'going'"
          class="w-[550px] absolute -mt-14"
          v-if="showGoing"
        ></DestinationDialog>
      </div>
      <div>
        <button
          @click.stop="toggle('showCalendar')"
          class="w-[240px] text-left text-gray-800 text-sm font-bold border-1 border-gray-300 p-4 rounded-md"
        >
          <div class="flex flex-row justify-between">
            <p>
              {{
                departFlight.toLocaleString("default", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </p>
            <p v-if="typeOfFlight === 'Round Trip' && returnFlight">
              {{
                returnFlight.toLocaleString("default", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              }}
            </p>
          </div>
        </button>
        <CalendarDialog
          @update-calendar="handleDate"
          :start-date="departFlight"
          :end-date="returnFlight"
          :type-flight="typeOfFlight"
          class="absolute right-27"
          v-if="showCalendar"
        ></CalendarDialog>
      </div>
      <div>
        <button
          @click.stop="toggle('showAdult')"
          class="w-[240px] text-left text-gray-800 text-sm font-bold border-1 border-gray-300 p-4 rounded-md"
        >
          <p>
            {{ `${passengerCount} ${passengerLable} , ${passenger.class}` }}
          </p>
        </button>
        <PassengerDialog
          :passenger="passenger"
          @update-passenger="handlePassenger"
          class="w-[550px] absolute right-2 -mt-14"
          v-if="showAdult"
        ></PassengerDialog>
      </div>
    </div>
    <div class="flex flex-row gap-5 justify-end mt-5 px-5">
      <div>
        <button
          class="border-2 border-blue-600 rounded-lg px-5 py-3 text-xl font-light text-blue-600"
        >
          Flight + Hotel
        </button>
      </div>
      <div>
        <button
          @click="searchFlight"
          class="border-2 border-blue-600 bg-blue-600 rounded-lg text-xl font-light px-5 py-3 text-white"
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
