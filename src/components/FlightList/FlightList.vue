<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAirlineLogo } from "../../utils/toolUtil.js";
import { getItems } from "../../utils/fetchUtil.js";
const { query } = useRoute();
const router = useRouter();

const showMoreOption = ref(false);
const flightOption = ref([]);
const flightFound = ref([]);

const uniqueAirline = ref([]);


onMounted(async () => {
  try {
    const leavingCity = encodeURIComponent(query.leavingDestination);
    const goingCity = encodeURIComponent(query.goingDestination);

    if (query.type === "Round Trip") {
      flightFound.value = await getItems(
        `${import.meta.env.VITE_APP_URL}/flights?departure.date=${
          query.departFlight
        }&returnDeparture.date=${
          query.returnFlight
        }&flightDetails.type=Round%20Trip&arrival.airport.city=${goingCity}&departure.airport.city=${leavingCity}`
      );
    } else if (query.type === "One Way") {
      flightFound.value = await getItems(
        `${import.meta.env.VITE_APP_URL}/flights?departure.date=${
          query.departFlight
        }&flightDetails.type=One%20Way&arrival.airport.city=${goingCity}&departure.airport.city=${leavingCity}`
      );
    }
    flightFound.value.forEach((flight) => {
      const newAirline = flight.flightDetails.airline;
      if (!uniqueAirline.value.includes(newAirline)) {
        uniqueAirline.value.push(newAirline);
      }
    });
  } catch (error) {
    console.error(error);
  }
});

const bookingFlight = (id, total) => {
  router.push({
    name: "flightBookingForm",
    params: {
      flightId: id,
      passenger: query.passenger,
    },
    query: {
      total: total,
    },
  });
};

const handleDestination = (data) => {
  if (data.type === "leaving") {
    leavingDestination.value = data.value;
  } else if (data.type === "going") {
    goingDestination.value = data.value;
  }
};

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
</script>

<template>
  <div class="flex justify-between px-30 bg-gray-100">
    <div class="w-[30%]">
      <h1 class="font-semibold tracking-wide text-xl text-black">
        Filter (Departure)
      </h1>
      <p class="font-light">
        {{
          flightFound.length > 1
            ? `${flightFound.length} flights`
            : `${flightFound.length} flight`
        }}
        found
      </p>
      <div>
        <p>Airlines</p>
        <div>
          <div>
            <input type="checkbox" name="" id="" />
            <p>All Airlines</p>
          </div>
          <div v-for="(airline, index) in uniqueAirline">
             <input v-model="filterAirline[airline]" type="checkbox" name="" id="" />
            <p>{{ airline }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-[70%]">
      <div class="">
        <div
          v-for="flight in flightFound"
          :key="flight.id"
          class="relative max-w-4xl mx-auto my-3"
        >
          <div
            v-for="flight in flightFound"
            :key="flight.id"
            class="font-light absolute top-0 left-0 bg-linear-65 from-purple-500 to-pink-500 text-white px-4 py-1 rounded-tl-xl rounded-br-xl text-sm z-10"
            v-if="
              flight.pricing.basePrice ===
              Math.min(...flightFound.map((f) => f.pricing.basePrice))
            "
          >
            Cheapest nonstop
          </div>
          <div class="card bg-white p-6 rounded-lg">
            <div class="flex items-center justify-between">
              <div class="flex mt-6 items-center space-x-8">
                <div class="relative h-12 w-12">
                  <img
                    :src="getAirlineLogo(flight.flightDetails.airline)"
                    alt="Airline Logo"
                    class="rounded-full h-12 w-12 object-contain"
                  />
                </div>

                <div class="flex items-center space-x-4">
                  <div class="text-center">
                    <div class="text-2xl font-semibold">
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
                    <div
                      class="text-xs font-light rounded-lg text-blue-500 px-3 py-1 bg-blue-100/50"
                    >
                      {{ flight.flightDetails.nonstop }}
                    </div>
                  </div>

                  <div class="text-center">
                    <div class="text-2xl font-semibold">
                      {{ flight.arrival.time }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ flight.arrival.airport.code }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-col justify-center items-end space-y-3">
                <div class="text-right items-center">
                  <div class="text-sm text-gray-800 font-light">
                    {{ flight.flightDetails.type }}
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class="text-lg mx-auto font-semibold pl-2 py-1 text-blue-700"
                      >{{ flight.pricing.currency }}</span
                    >
                    <span class="text-[25px] font-semibold text-[#3366FF]">{{
                      flight.pricing.basePrice
                    }}</span>
                  </div>
                </div>
                <button
                  @click="toggleShowOption(flight.id)"
                  class="bg-[#3366FF] hover:bg-[#2952CC] w-[100%] text-white py-2 px-0 rounded-md"
                >
                  {{
                    showMoreOption && flightOption.includes(flight.id)
                      ? "Hide"
                      : "Show"
                  }}
                </button>
              </div>
            </div>

            <div class="mt-1">
              <div class="text-sm font-light text-gray-500">
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
                <h1 class="font-semibold text-black text-xl tracking-wide">
                  {{ flight.flightDetails.class }} class
                </h1>
                <hr class="text-gray-200 mb-3 mt-3" />
                <div class="mt-3 mb-3 space-y-3">
                  <p class="font-semibold font-sm tracking-wide">Bagage</p>
                  <div class="flex flex-row gap-2">
                    <p>
                      <img
                        src="../../assets/image/luggage-svgrepo-com.svg"
                        class="w-5 h-6"
                        alt=""
                      />
                    </p>
                    <p class="font-light text-[15px]">Carry-on baggage:</p>
                    <p class="px-1 font-semibold text-[15px]">
                      {{ flight.baggageAllowance.carryOn.pieces }}
                    </p>
                    <p class="font-semibold text-[15px]">pieces</p>
                  </div>
                  <div class="flex flex-row gap-2">
                    <p>
                      <img
                        src="../../assets/image/briefcase-bag-svgrepo-com.svg"
                        class="w-5 h-6"
                        alt=""
                      />
                    </p>
                    <p class="text-[15px] font-light">Checked baggage:</p>
                    <p class="font-semibold">
                      {{ flight.baggageAllowance.checked.pieces }}
                    </p>
                    <p class="text-[15px] font-semibold">
                      x {{ option.checkedWeight }} kg
                    </p>
                  </div>
                </div>
                <div class="mb-3 space-y-2">
                  <p class="font-semibold tracking-wide">Fare Rules</p>
                  <p class="text-[15px] font-light">
                    <span v-if="flight.policies.refundable">Refundable</span>
                    <span class="flex items-center gap-3" v-else>
                      <img
                        src="../../assets/image/block-svgrepo-com.svg"
                        class="w-5 h-5"
                        alt=""
                      />
                      Non-refundable
                    </span>
                  </p>
                  <p class="text-[15px] font-light">
                    <span
                      class="flex items-center gap-1.5"
                      v-if="flight.policies.changesPermitted"
                    >
                      <img
                        src="../../assets/image/check-read-svgrepo-com.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      Change-permitted</span
                    >
                    <span v-else>
                      <i class="fa-solid fa-ban w-6 text-center"></i>
                      Non-change-permitted
                    </span>
                  </p>
                </div>
                <div class="mt-3">
                  <div class="flex flex-row items-center gap-2">
                    <p class="text-xl font-semibold">
                      {{ flight.pricing.currency }}
                    </p>
                    <p class="text-2xl font-semibold">
                      {{ option.totalPrice }}
                    </p>
                  </div>
                  <p class="text-sm text-gray-500 font-light">
                    {{ flight.flightDetails.type }}
                  </p>
                </div>
                <div class="mt-4">
                  <button
                    @click="bookingFlight(flight.id, option.totalPrice)"
                    class="bg-blue-500 text-white w-[100%] text-lg rounded-lg tracking-wide py-3"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
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
