<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { postItem } from "../../utils/fetchUtil.js";
const { query } = useRoute();
const flight = ref(JSON.parse(query.flight));
const passengerInfo = ref(JSON.parse(query.passengerInfo));
const bookingNumber = computed(() => {
    return new Date().getTime()
})
const statusPost = ref(null)

const data = computed(() => {
    return {
        id: bookingNumber.value,
        flight: flight.value.id,
        passenger: passengerInfo.value,
        bookingDate: new Date(),
        approve: false
    }
})

const postFlightBooking = async () => {
    try {
        statusPost.value = await postItem(`${import.meta.env.VITE_APP_URL}/flightBooking`,data.value)
    } catch (error) {
        
    }
}

</script>
<template>
  <div>
    <div class="flex justify-between">
      <div class="max-w-4xl mx-auto bg-white min-h-screen rounded-t-xl">
        <div class="p-6 pb-0">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-semibold text-gray-800">
              Select a Payment Method
            </h1>
            <div class="text-gray-600 font-light text-sm">
              Please secure your booking within
              <span class="font-semibold text-black">00:22:04</span>
            </div>
          </div>
          <div
            class="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center mr-4"
              ></div>
              <span class="text-xl font-semibold text-gray-800"
                >Credit/Debit Card</span
              >
            </div>
            <div class="flex space-x-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Unionpay_logo.svg/2560px-Unionpay_logo.svg.png"
                alt="UnionPay"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                alt="Amex"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png"
                alt="JCB"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Discover_Card_logo.svg/1280px-Discover_Card_logo.svg.png"
                alt="Discover"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Diners_Club_International_logo.svg/1200px-Diners_Club_International_logo.svg.png"
                alt="Diners Club"
                class="h-6 w-auto bg-white p-0.5 rounded"
              />
            </div>
          </div>

          <div
            class="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center bg-blue-50"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div class="text-xl font-semibold text-gray-800">
                  QR PromptPay
                </div>
                <div class="text-gray-600">Scan to pay using a banking app</div>
              </div>
            </div>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/PromptPay-logo.svg/1200px-PromptPay-logo.svg.png"
                alt="PromptPay"
                class="h-8 w-auto"
              />
            </div>
          </div>

          <div
            class="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center mr-4"
              ></div>
              <span class="text-xl font-semibold text-gray-800"
                >Bank Transfer</span
              >
            </div>
            <div class="flex space-x-1">
              <div
                class="h-8 w-8 rounded-md bg-yellow-500 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
              </div>
              <div
                class="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div
                class="h-8 w-8 rounded-md bg-green-500 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div
                class="h-8 w-8 rounded-md bg-blue-400 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div
                class="h-8 w-8 rounded-md bg-orange-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-6 mt-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Use Gift Card to save on this booking
          </h2>

          <div
            class="border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center bg-white"
          >
            <div class="flex items-center">
              <div class="w-8 h-8 flex items-center justify-center mr-4">
                <div class="w-5 h-5 border-2 border-gray-300"></div>
              </div>
              <span class="text-xl font-semibold text-gray-800">Gift Card</span>
            </div>
            <div
              class="h-8 w-8 bg-indigo-500 rounded flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clip-rule="evenodd"
                />
                <path
                  d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
                />
              </svg>
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
          <!-- Main Ticket Card -->
          <div class="bg-white rounded-3xl shadow-md overflow-hidden">
            <!-- Booking Info Header -->
            <div
              class="px-6 py-5 flex justify-between items-center border-b border-gray-100"
            >
              <h2 class="text-xl font-bold text-gray-800">Booking Info</h2>
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
              <h3 class="text-xl font-bold text-gray-800 mb-4">
                {{ flight.departure.airport.city }} ⇄
                {{ flight.arrival.airport.city }}
              </h3>

              <div class="mb-6">
                <div class="flex items-center mb-3">
                  <span
                    class="text-blue-500 font-medium mr-3 bg-blue-100/50 px-1 py-0.5 rounded-md"
                    >Depart</span
                  >
                  <span class="text-gray-800 font-bold mr-3">{{
                    new Date(flight.departure.date).toLocaleString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}</span>
                  <div class="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
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
                    <div class="mb-10">{{ flight.departure.time }}</div>
                    <div>{{ flight.arrival.time }}</div>
                  </div>

                  <div class="mx-2 relative flex flex-col items-center">
                    <div class="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                    <div class="h-20 w-0.5 bg-gray-300"></div>
                    <div class="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                  </div>

                  <div class="flex-1 text-gray-600">
                    <div class="mb-10">{{ flight.departure.airport.name }}</div>
                    <div>{{ flight.arrival.airport.name }}</div>
                  </div>
                </div>
              </div>

              <div v-if="flight.returnDeparture" class="mb-2">
                <div class="flex items-center mb-3">
                  <span class="text-blue-500 font-medium mr-3">Return</span>
                  <span class="text-gray-800 font-bold mr-3">{{ new
                                        Date(flight.returnDeparture.date).toLocaleString("default", {
                                            month: "short",
                                            day: "numeric",
                                           year: "numeric"
                                        })}}</span>
                  <div class="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
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
                    <div class="mb-10">{{ flight.returnDeparture.time }}</div>
                    <div>{{ flight.returnArrival.time }}</div>
                  </div>
                  <div class="mx-2 relative flex flex-col items-center">
                    <div class="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                    <div class="h-20 w-0.5 bg-gray-300"></div>
                    <div class="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                  </div>

                  <div class="flex-1 text-gray-600">
                    <div class="mb-10">
                      {{ flight.returnDeparture.airport.name }}
                    </div>
                    <div>{{ flight.returnArrival.airport.name }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dotted line separator to look like a ticket -->
            <div class="px-6">
              <div class="border-t border-dashed border-gray-300"></div>
            </div>

            <!-- Price Details Section -->
            <div class="px-6 py-4">
              <h3 class="text-lg font-bold text-gray-800 mb-3">
                Price Details
              </h3>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Prepay online</span>
                <span class="text-gray-800 font-medium"
                  >฿ {{ query.total }}</span
                >
              </div>
            </div>

            <!-- Dotted line separator to look like a ticket -->
            <div class="px-6">
              <div class="border-t border-dashed border-gray-300"></div>
            </div>

            <!-- Total Section -->
            <div class="px-6 py-4 bg-gray-50">
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-gray-800">Total</span>
                <span class="text-xl font-bold text-gray-800"
                  >฿ {{ query.total }}</span
                >
              </div>
            </div>
          </div>

          <!-- Promo Banner -->
          <div
            class="bg-white rounded-3xl shadow-md mt-4 p-6 relative overflow-hidden"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-24 w-24 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 text-yellow-400 absolute top-2 right-16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M5.05 3.636a1 1 0 011.414 0L10 7.172l3.536-3.536a1 1 0 111.414 1.414L11.414 8.586l3.536 3.536a1 1 0 01-1.414 1.414L10 9.828l-3.536 3.536a1 1 0 01-1.414-1.414l3.536-3.536-3.536-3.536a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
