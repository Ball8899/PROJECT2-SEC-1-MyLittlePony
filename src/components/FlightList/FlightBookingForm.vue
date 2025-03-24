<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getItemById } from "../../utils/fetchUtil.js";
import { getAirlineLogo } from "../../utils/toolUtil.js";
import { useRouter } from "vue-router";
import UserFrom from "../form/UserFrom.vue";
const router = useRouter();
const { params, query } = useRoute();

const totalFormat = computed(() => {
  const total = (
    Number(query.total) * Number(params.passenger)
  ).toLocaleString();
  return total;
});

const passengerInto = ref(null)

const handleUserInfo = (data) => {
  passengerInto.value = data
}

const goBack = () => {
  router.go(-1);
};

const continuePayment = () => {
  router.push({
    name: 'paymentForm',
    query: {
      passengerInfo: JSON.stringify(passengerInto.value),
      flight: JSON.stringify(flight.value),
      total: totalFormat.value
    }
  })
}

const flight = ref(null);
onMounted(async () => {
  try {
    flight.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/flights`,
      params.flightId
    );
  } catch (error) {}
});
</script>

<template>
  <div v-if="flight" class="mx-auto -mt-13 rounded-t-3xl bg-white">
    <div class="flex px-30 py-15 flex-row justify-between">
      <div class="max-w-xl">
        <div class="flex justify-between items-center mb-10">
          <h1 class="text-3xl font-bold text-[#0a2559] leading-tight mr-7">
            Trip to {{ flight.arrival.airport.city }}
          </h1>
          <button
            @click="goBack"
            class="bg-blue-50 text-sm text-blue-600 px-2 py-1 rounded-full flex items-center gap-1 font-light"
          >
            Change Flight
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>
        </div>

        <div class="mb-5">
          <div class="flex gap-4 items-center">
            <div
              class="bg-[#3366ff] text-white font-semibold px-3 py-1 rounded-md"
            >
              Depart
            </div>
            <div class="text-gray-800 font-light text-base ml-1">
              {{
                new Date(flight.departure.date).toLocaleString("default", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }}
            </div>
            <div
              class="text-gray-600 text-base font-light ml-2 border-l border-transparent"
            >
              Duration {{ flight.flightDetails.duration }}
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute left-[80px] top-7 bottom-7 w-1 bg-gray-200"
          ></div>

          <div class="flex mb-16 relative">
            <div class="w-20 text-lg font-semibold text-[#0a2559]">
              {{ flight.departure.time }}
            </div>
            <div class="ml-10 flex-1">
              <h2 class="text-lg font-semibold tracking-wide text-[#0a2559]">
                {{ flight.departure.airport.name }}
              </h2>
              <div class="flex items-center mt-5">
                <div class="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    :src="getAirlineLogo(flight.flightDetails.airline)"
                    alt="Airline Logo"
                    class="w-8 h-8 object-cover left-2 absolute"
                  />
                </div>
                <div class="text-gray-500 text-base font-light -ml-8">
                  {{ flight.flightDetails.airline }}
                  <span class="mx-2">{{
                    flight.flightDetails.flightNumber
                  }}</span>
                  {{ flight.flightDetails.aircraft }}
                  <span class="mx-2">{{ flight.flightDetails.class }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex -mt-12">
            <div class="w-20 text-lg font-semibold text-[#0a2559]">
              {{ flight.arrival.time }}
            </div>
            <div class="ml-10">
              <h2 class="text-lg font-semibold tracking-wide text-[#0a2559]">
                {{ flight.arrival.airport.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-white rounded-2xl shadow-md max-w-xl p-8 right-30 fixed">
          <h1 class="text-xl font-semibold text-[#0a2559] mb-8">
            Price Details
          </h1>

          <div class="flex justify-between items-center mb-8 gap-10">
            <div class="flex items-center">
              <h2 class="text-base font-semibold text-[#0a2559]">
                Tickets ({{ params.passenger }} Passenger)
              </h2>
            </div>
            <span class="text-base font-semibold text-[#0a2559]"
              >THB {{ totalFormat }}</span
            >
          </div>
          <h2 class="text-base font-semibold text-[#0a2559] mb-4">Baggage</h2>

          <div class="space-y-2 mb-2">
            <div class="flex justify-between items-center">
              <span class="text-base font-light text-[#0a2559]"
                >Personal item</span
              >
              <span class="text-base text-[#00bcd4] font-light">{{
                flight.baggageAllowance.personalItem.included
                  ? "Free"
                  : "Not Free"
              }}</span>
            </div>
            <div class="border-b border-dashed border-gray-200"></div>

            <div class="flex justify-between items-center">
              <span class="text-base font-light text-[#0a2559]"
                >Carry-on baggage</span
              >
              <span class="text-base font-light text-[#00bcd4]">{{
                flight.baggageAllowance.carryOn.included ? "Free" : "Not Free"
              }}</span>
            </div>
            <div class="border-b border-dashed border-gray-200"></div>

            <div class="flex justify-between items-center">
              <span class="text-base font-light text-[#0a2559]"
                >Checked baggage</span
              >
              <span
                :class="
                  flight.baggageAllowance.carryOn.included
                    ? 'text-[#00bcd4]'
                    : 'text-gray-400'
                "
                class="text-base font-light"
                >{{
                  flight.baggageAllowance.carryOn.included
                    ? "Included"
                    : "Not Included"
                }}</span
              >
            </div>
          </div>
          <div class="border-b border-gray-200 my-8"></div>
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-[#0a2559]">Total</h2>
            <span class="text-xl font-semibold text-[#3366ff]"
              >THB {{ totalFormat }}</span
            >
          </div>

          <div class="flex justify-end">
            <div
              class="border border-[#ff9800] rounded-md px-2 py-1 flex items-center text-[#ff9800]"
            >
              <div
                class="bg-[#ff9800] text-white rounded-full h-4 w-4 flex items-center justify-center mr-2 font-normal text-sm"
              >
                T
              </div>
              <span class="font-light text-sm">Trip Coins + 50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-500 bg-gray-200/40">
      <div class="max-w-3xl mx-auto absolute left-30 mt-10">
        <div class="flex items-center gap-2 mb-6">
          <div
            class="w-3 h-3 rounded-full bg-blue-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white"
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
          <p class="text-black text-sm font-light">
            Act fast to lock in the current price and cabin
          </p>
        </div>

        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-semibold text-black">Your Ticket(s)</h1>
          <div class="flex items-center gap-4">
            <span class="text-gray-500 text-sm font-light"
              >{{ flight.flightDetails.class }} class</span
            >
            <a
              href="#"
              class="text-blue-500 text-sm font-light flex items-center"
            >
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
        </div>

        <div class="bg-white rounded-lg p-6 mb-6 border border-gray-100">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 class="text-lg font-semibold text-black mb-6">
                Baggage Allowance
              </h2>

              <div class="flex items-end gap-3 mb-6">
                <div class="text-teal-500 mt-1">
                  <img
                    src="../../assets/image/business-svgrepo-com.svg"
                    class="w-7 h-7 flex"
                    alt=""
                  />
                </div>
                <div class="flex items-start">
                  <span class="text-black text-base font-light"
                    >Carry-on baggage:
                  </span>
                  <span class="text-black text-base font-semibold">
                    {{ flight.baggageAllowance.carryOn.pieces }} piece</span
                  >
                </div>
              </div>

              <div class="flex items-end gap-3">
                <div class="text-gray-400 mt-1">
                  <img
                    src="../../assets/image/checked-baggage-business-bag-svgrepo-com.svg"
                    class="w-7 h-7"
                    alt=""
                  />
                </div>
                <div>
                  <span class="text-black text-base font-light"
                    >Checked baggage:
                  </span>
                  <span class="text-black text-base font-normal"
                    >{{
                      flight.pricing.baggageOptions?.filter(
                        (option) => option.totalPrice == query.total
                      )[0].checkedWeight
                    }}
                    kg</span
                  >
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-lg font-semibold text-black mb-6">Policies</h2>

              <div class="flex items-end gap-3 mb-6">
                <div class="text-gray-400 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                  </svg>
                </div>
                <div>
                  <span class="text-black text-base font-light">{{
                    flight.policies.refundable ? "Refundable" : "Non-refundable"
                  }}</span>
                </div>
              </div>

              <div class="flex items-end gap-3">
                <div class="text-gray-400 mt-1">
                  <img
                    src="../../assets/image/changes-allow-svgrepo-com.svg"
                    class="w-7 h-7"
                    alt=""
                  />
                </div>
                <div>
                  <span class="text-black text-base font-light">{{
                    flight.policies.changesPermitted
                      ? "Changes permitted"
                      : "Changes not permitted"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-lg p-6 flex items-start gap-4">
            <div class="flex-shrink-0">
              <img
                src="../../assets/image/ticket-star-svgrepo-com.svg"
                class="w-18 h-18"
                alt=""
              />
            </div>
            <div>
              <h3 class="text-xl font-bold text-blue-900 mb-2">
                Ticket Issuing Time
              </h3>
              <p class="text-gray-500 font-thin">
                Once payment is confirmed, tickets will be issued within 12
                hours
              </p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 flex items-start gap-4">
            <div class="flex-shrink-0">
              <div class="w-20 h-20 flex items-center justify-center">
                <img
                  src="../../assets/image/travel-svgrepo-com.svg"
                  class="w-18 h-18"
                  alt=""
                />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-blue-900 mb-2">
                Travel Worry-free
              </h3>
              <p class="text-gray-500 font-thin">
                With our service guarantee, you know we've always got your back!
                <a href="#" class="text-blue-500">View Details</a>
              </p>
            </div>
          </div>
        </div>
        <div class="py-5 mt-15">
          <div class="flex justify-between items-center font-thin">
            <h1 class="text-2xl font-semibold">Who's Traveling?</h1>
            <p>Sign in for effortless booking</p>
          </div>
          <UserFrom @send-user-form="handleUserInfo" :passenger="Number(params.passenger)"></UserFrom>
        </div>
        <div class="min-h-screen">
          <div class="">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">
              Contact Details
            </h1>

            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="flex flex-col">
                  <div class="relative">
                    <div
                      class="absolute -top-2.5 left-4 bg-white px-1 text-gray-500 text-sm"
                    >
                      Contact name
                    </div>
                    <input
                      type="text"
                      class="w-full px-4 pt-4 pb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>

                <div class="flex flex-col">
                  <div class="relative">
                    <div
                      class="absolute -top-2.5 left-4 bg-white px-1 text-gray-500 text-sm"
                    >
                      Email
                    </div>
                    <input
                      type="email"
                      class="w-full px-4 pt-4 pb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="relative">
                    <div
                      class="absolute -top-2.5 left-4 bg-white px-1 text-gray-500 text-sm"
                    >
                      Mobile phone
                    </div>
                    <div class="flex">
                      <div
                        class="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-white"
                      >
                        <span class="text-gray-700 font-medium">+66</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 ml-1 text-gray-500"
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
                      <input
                        type="tel"
                        class="w-full px-4 pt-4 pb-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 rounded-lg p-6 mb-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-1">
                      Continue With Your Account
                    </h2>
                    <p class="text-gray-700">
                      Enter the verification code we've sent to
                      <span class="font-medium">Chu@gmail.com</span> to manage
                      all your bookings in one place
                    </p>
                  </div>
                  <button class="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="flex gap-2 mb-4">
                  <input
                    type="text"
                    maxlength="1"
                    class="w-full aspect-square border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    class="w-full aspect-square border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    class="w-full aspect-square border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    class="w-full aspect-square border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    class="w-full aspect-square border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    maxlength="1"
                    class="w-full aspect-square border border-gray-300 rounded-lg text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div class="flex items-center mb-4">
                  <a href="#" class="text-blue-500 hover:underline"
                    >Sign in with password</a
                  >
                  <span class="mx-2 text-gray-500">or</span>
                  <a href="#" class="text-gray-700 hover:underline"
                    >Resend Verification Code (16s)</a
                  >
                </div>

                <button
                  class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200 mb-6"
                >
                  Verify and Sign In
                </button>

                <hr class="mb-6" />

                <div class="flex flex-wrap gap-8 mb-4">
                  <div class="flex items-center">
                    <div
                      class="bg-teal-100 text-teal-600 p-1 rounded-full mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="text-gray-700 font-medium"
                      >Easily manage booking</span
                    >
                  </div>

                  <div class="flex items-center">
                    <div
                      class="bg-orange-100 text-orange-600 p-1 rounded-full mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="text-gray-700 font-medium"
                      >Rewards for booking</span
                    >
                  </div>
                </div>

                <div class="flex justify-between items-center">
                  <div class="flex-1">
                    <p class="text-gray-700 text-sm">
                      By proceeding, I acknowledge that I have read and agree to
                      Trip.com's
                      <a href="#" class="text-gray-800 underline"
                        >Terms and Conditions</a
                      >
                      and
                      <a href="#" class="text-gray-800 underline"
                        >Privacy Statement</a
                      >.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white px-5 flex-col -mt-10 rounded-lg">
          <div class="flex justify-between items-center pt-3">
            <p class="text-lg font-semibold">Total</p>
            <div class="flex items-center gap-3">
              <p class="text-3xl font-semibold text-blue-500">{{ flight.pricing.currency }}</p>
              <p class="text-3xl font-semibold text-blue-500">{{ totalFormat }}</p>
            </div>
          </div>
          <div class=" pt-3 pb-5">
            <button @click="continuePayment" class=" tracking-wide py-3 w-[100%] rounded-sm bg-blue-500 text-xl font-semibold text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
