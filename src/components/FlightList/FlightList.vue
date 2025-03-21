<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import DestinationDialog from "../DestinationDialog.vue";
import { getItems } from "../../utils/fetchUtil.js";
const { query } = useRoute()
const router = useRouter()

const showMoreOption = ref(false);
const flightOption = ref([]);
const flightFound = ref([])


onMounted(async () => {
  try {
    const leavingCity = encodeURIComponent(query.leavingDestination);
    const goingCity = encodeURIComponent(query.goingDestination);

    flightFound.value = await getItems(`${import.meta.env.VITE_APP_URL}/flights?arrival.airport.city=${goingCity}&departure.airport.city=${leavingCity}`);
  } catch (error) {
    console.error(error);
  }
});

const bookingFlight = () => {
  router.push({
    name: 'flightBookingForm',
    query: {
      type: query.type,
      departFlight: query.departFlight,
      returnFlight: query.returnFlight,
      goingDestination: query.goingDestination,
      leavingDestination: query.leavingDestination,
      passenger: query.passenger
    },
  })
}

const handleDestination = (data) => {
  if (data.type === 'leaving') {
    leavingDestination.value = data.value
    
  } else if(data.type === 'going') {
    goingDestination.value = data.value  
  }
}

const toggleShowOption = (id) => {
  if (flightOption.value.includes(id)) {
    flightOption.value = flightOption.value.filter(
      (flightId) => flightId !== id
    );
  } else {
    flightOption.value.push(id);
  }

  showMoreOption.value = flightOption.value.length > 0;
};


const getAirlineLogo = (airline) => {
  const formattedAirline = airline.replaceAll(" ", "");
  try {
    return `/src/assets/airlines/${formattedAirline}.png`;
  } catch (e) {
    return `/src/assets/airlines/default.png`;
  }
};
</script>

<template>
  <div>
    <div
      v-for="flight in flightFound"
      :key="flight.id"
      class="relative max-w-4xl mx-auto my-6"
    >
      <div
        v-for="flight in flightFound"
        :key="flight.id"
        class="absolute top-2.5 left-0 bg-linear-65 from-purple-500 to-pink-500 text-white px-4 py-1 rounded-tl-xl rounded-br-xl text-sm z-10"
        v-if="
          flight.pricing.basePrice ===
          Math.min(...flightFound.map((f) => f.pricing.basePrice))
        "
      >
        Cheapest nonstop
      </div>
      <div class="card bg-white shadow-lg p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <div class="relative h-12 w-12">
              <img
                :src="getAirlineLogo(flight.flightDetails.airline)"
                alt="Airline Logo"
                class="rounded-full h-12 w-12 object-contain"
              />
            </div>

            <div class="flex items-center space-x-4">
              <div class="text-center">
                <div class="text-2xl font-bold">
                  {{ flight.departure.time }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ flight.departure.airport.code }}
                </div>
              </div>

              <div class="flex flex-col items-center px-4">
                <div class="text-sm text-gray-500">
                  {{ flight.flightDetails.duration }}
                </div>
                <div class="relative my-2 w-32 mt-3 mb-3">
                  <div
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-300"
                  ></div>
                  <div class="w-full h-[2px] bg-gray-300"></div>
                  <div
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-300"
                  ></div>
                </div>
                <div class="text-sm rounded-lg text-blue-500 p-1 bg-blue-100">
                  {{ flight.flightDetails.nonstop }}
                </div>
              </div>

              <div class="text-center">
                <div class="text-2xl font-bold">{{ flight.arrival.time }}</div>
                <div class="text-sm text-gray-500">
                  {{ flight.arrival.airport.code }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-end space-y-2">
            <div class="text-right">
              <div class="text-sm text-gray-500">
                {{ flight.flightDetails.type }}
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm">{{ flight.pricing.currency }}</span>
                <span class="text-2xl font-bold text-[#3366FF]">{{
                  flight.pricing.basePrice
                }}</span>
              </div>
            </div>
            <button
              @click="toggleShowOption(flight.id)"
              class="bg-[#3366FF] hover:bg-[#2952CC] text-white py-2 px-6 rounded-md"
            >
              {{
                showMoreOption && flightOption.includes(flight.id) ? "Hide" : "Show"
              }}
            </button>
          </div>
        </div>

        <div class="mt-4">
          <div class="text-sm text-gray-500">
            {{ flight.flightDetails.airline }}
          </div>
        </div>
      </div>
      <transition name="fade-slide">
        <div
          v-show="showMoreOption && flightOption.includes(flight.id)"
          class="flex justify-start bg-gray-100/50 shadow-lg p-1 rounded-lg"
        >
          <div
            v-for="(option, index) in flight.pricing.baggageOptions"
            class="p-7 bg-white m-3 w-[350px] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
          >
            <h1 class="font-semibold text-black text-2xl tracking-wide">
              {{ flight.flightDetails.class }}
            </h1>
            <hr class="text-gray-300 mb-3 mt-3" />
            <div class="mt-3 mb-3 space-y-2">
              <p class="font-semibold tracking-wide">Bagage</p>
              <div class="flex flex-row gap-2">
                <p>
                  <i
                    class="fa-solid fa-suitcase-rolling text-blue-500 w-6 text-center"
                  ></i>
                </p>
                <p>Carry-on baggage:</p>
                <p class="px-1 font-semibold">
                  {{ flight.baggageAllowance.carryOn.pieces }}
                </p>
                <p class="font-semibold">pieces</p>
              </div>
              <div class="flex flex-row gap-2">
                <p class="text-center">
                  <i
                    class="fa-solid fa-cart-flatbed-suitcase text-blue-500 w-6"
                  ></i>
                </p>
                <p>Checked baggage:</p>
                <p class="font-semibold">
                  {{ flight.baggageAllowance.checked.pieces }}
                </p>
                <p class="font-semibold">x {{ option.checkedWeight }} kg</p>
              </div>
            </div>
            <div class="mb-3 space-y-2 ">
              <p class="font-semibold tracking-wide">Fare Rules</p>
              <p class="">
                <span v-if="flight.policies.refundable">Refundable</span>
                <span v-else>
                  <i class="fa-solid fa-ban w-6 text-center"></i> Non-refundable
                </span>
              </p>
              <p class="">
                <span class="" v-if="flight.policies.changesPermitted">
                    <i class="fa-solid fa-check w-6 text-center"></i> Change-permitted</span>
                <span v-else>
                  <i class="fa-solid fa-ban w-6 text-center"></i> Non-change-permitted
                </span>
              </p>
            </div>
            <div class="mt-3">
               <div class="flex flex-row items-center gap-2">
                 <p class="text-2xl font-semibold">{{ flight.pricing.currency }}</p>
              <p class="text-2xl font-bold">{{ option.totalPrice }}</p>
               </div>
              <p class="text-sm text-gray-500">{{ flight.flightDetails.type }}</p>
            </div>
            <div class="mt-4">
                <button @click="bookingFlight" class="bg-blue-500 text-white w-[100%] text-lg rounded-lg tracking-wide py-3">Continue</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
