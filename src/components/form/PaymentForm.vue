<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { postItem } from "../../utils/fetchUtil.js";
const { query } = useRoute();
const flight = ref(JSON.parse(query.flight));
const contact = ref(JSON.parse(query.contact));
const passengerInfo = ref(JSON.parse(query.passengerInfo));
const bookingNumber = computed(() => {
  return new Date().getTime();
});
const statusPost = ref(null);

const data = computed(() => {
  return {
    id: bookingNumber.value,
    flight: flight.value.id,
    passenger: passengerInfo.value,
    contact: contact.value,
    bookingDate: new Date(),
    approve: "waiting",
  };
});

const postFlightBooking = async () => {
  try {
    statusPost.value = await postItem(
      `${import.meta.env.VITE_APP_URL}/flightBooking`,
      data.value
    );
  } catch (error) {}
};
</script>
<template>
  <div>
    <div class="flex justify-between px-30 py-10 gap-5 bg-gray-100">
      <div class="w-[65%] mx-auto bg-white min-h-screen px-10 py-10 rounded-t-xl">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-xl font-bold text-gray-800">
            Select a Payment Method
          </h1>
          <div class="font-light text-gray-600">
            Please secure your booking within
            <span class="font-light">00:05:56</span>
          </div>
        </div>

        <div class="border border-gray-200 rounded-lg mb-4 p-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div
                class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center"
              >
              </div>
              <span class="text-lg font-semibold text-gray-800"
                >Credit/Debit Card</span
              >
            </div>
          </div>
        </div>

        <div class="border-2 border-blue-500 rounded-lg mb-4 p-4 bg-blue-50">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div
                class="w-6 h-6 rounded-full bg-blue-500 border-2 border-blue-500 flex items-center justify-center"
              >
                <div class="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div class="flex flex-col">
                <span class="text-lg font-semibold text-gray-800"
                  >QR PromptPay</span
                >
                <span class="text-sm text-gray-600"
                  >Scan to pay using a banking app</span
                >
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div class="border border-gray-200 rounded-lg mb-4 p-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div
                class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center"
              >
              </div>
              <span class="text-lg font-semibold text-gray-800"
                >Bank Transfer</span
              >
            </div>
          </div>
        </div>

        <div class="mt-12">
          <h2 class="text-xl font-bold text-gray-800 mb-4">
            Use Gift Card to save on this booking
          </h2>
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center gap-4">
              <div
                class="w-6 h-6 rounded border border-gray-300 flex items-center justify-center"
              >
              </div>
              <span class="text-lg font-semibold text-gray-800">Gift Card</span>
              <div class="ml-auto"></div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <button
            @click="postFlightBooking"
            class="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-lg"
          >
            Pay ฿ {{ query.total }}
          </button>
        </div>
      </div>
      <div>
        <div class="max-w-md w-full">
          <div class="bg-white rounded-xl overflow-hidden">
            <div
              class="px-6 py-3 flex justify-between items-center border-b border-gray-100"
            >
              <h2 class="text-md font-semibold text-gray-800">Booking Info</h2>
              <a href="#" class="text-blue-500 font-medium flex items-center">
                Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div class="px-6 py-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                {{ flight.departure.airport.city }} ⇄
                {{ flight.arrival.airport.city }}
              </h3>

              <div class="mb-6">
                <div class="flex items-center mb-3">
                  <span class="bg-blue-500 px-2 py-0.5 text-white rounded-sm text-sm mr-3">Depart</span>
                  <span class="text-gray-800 font-meduim mr-3">{{
                    new Date(flight.departure.date).toLocaleString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}</span>
                  <div class="flex items-center font-light text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ flight.flightDetails.duration }}</span>
                  </div>
                </div>

                <div class="flex">
                  <div class="w-20 font-bold text-gray-800">
                    <div class="mb-4">{{ flight.departure.time }}</div>
                    <div>{{ flight.arrival.time }}</div>
                  </div>

                  <div class="mx-2 mt-1.5 relative flex flex-col items-center">
                    <div class="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    <div class="h-10 w-0.5 bg-gray-300"></div>
                    <div class="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  </div>

                  <div class="flex-1 font-light text-sm text-gray-600">
                    <div class="mb-6">{{ flight.departure.airport.name }}</div>
                    <div>{{ flight.arrival.airport.name }}</div>
                  </div>
                </div>
              </div>

              <div v-if="flight.returnDeparture" class="mb-2">
                <div class="flex items-center mb-3">
                  <span class="bg-red-500 px-2 py-0.5 text-white rounded-sm text-sm mr-3">Return</span>
                  <span class="text-gray-800 font-meduim mr-3">{{
                    new Date(flight.returnDeparture.date).toLocaleString(
                      "default",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  }}</span>
                  <div class="flex items-center font-light text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{{ flight.flightDetails.duration }}</span>
                  </div>
                </div>

                <div class="flex">
                  <div class="w-20 font-bold text-gray-800">
                    <div class="mb-4">{{ flight.returnDeparture.time }}</div>
                    <div>{{ flight.returnArrival.time }}</div>
                  </div>
                  <div class="mx-2 mt-2 relative flex flex-col items-center">
                    <div class="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    <div class="h-10 w-0.5 bg-gray-300"></div>
                    <div class="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  </div>

                  <div class="flex-1 font-light text-sm text-gray-600">
                    <div class="mb-6">
                      {{ flight.returnDeparture.airport.name }}
                    </div>
                    <div>{{ flight.returnArrival.airport.name }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-6">
              <div class="border-t border-dashed border-gray-300"></div>
            </div>

            <div class="px-6 py-4">
              <h3 class="text-md font-semibold text-gray-800 mb-3">
                Price Details
              </h3>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Prepay online</span>
                <span class="text-gray-800 font-medium"
                  >฿ {{ query.total }}</span
                >
              </div>
            </div>

            <div class="px-6">
              <div class="border-t border-dashed border-gray-300"></div>
            </div>

            <div class="px-6 py-4 bg-gray-50">
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-gray-800">Total</span>
                <span class="text-xl font-bold text-gray-800"
                  >฿ {{ query.total }}</span
                >
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-xl mt-4 p-6 relative overflow-hidden"
          >
            <div class="flex justify-between">
              <div class="max-w-xs z-10 relative">
                <h3 class="text-xl font-bold text-gray-800 mb-2">
                  Pay Now and Save up to
                  <span class="text-pink-500">25%</span> on Stays!
                </h3>
                <p class="text-gray-700 text-sm">
                  Free cancellation for your stay if your flight is rescheduled
                </p>
              </div>
              <div class="absolute bottom-0 right-0 opacity-20">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
