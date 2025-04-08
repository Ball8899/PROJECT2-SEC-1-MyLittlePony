<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getItemById } from "../../utils/fetchUtil.js";
import { getAirlineLogo, notFilledInto, checkPhoneNumber } from "../../utils/toolUtil.js";
import { useRouter } from "vue-router";
import UserFrom from "../form/UserFrom.vue";
import NotiDialog from "../validate/NotiDialog.vue";

const router = useRouter();
const { params, query } = useRoute();

const phoneInvalid = ref(false)

const totalFormat = computed(() => {
  const total = (
    Number(query.total) * Number(params.passenger)
  ).toLocaleString();
  return total;
});
const passengerInto = ref([]);

const handleUserInfo = (data) => {
  passengerInto.value = [...data];
};

const goBack = () => {
  router.go(-1);
};

const contact = ref([
  {
    name: "",
    email: "",
    phone: "",
  },
]);

const continuePayment = () => {

  if (notFilledInto(passengerInto.value) || notFilledInto(contact.value))  {
    return;
  }
  router.push({
    name: "paymentForm",
    query: {
      passengerInfo: JSON.stringify(passengerInto.value),
      flight: JSON.stringify(flight.value),
      contact: JSON.stringify(contact.value),
      total: totalFormat.value,
    },
  });
};

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
  <div v-if="flight" class="mx-auto rounded-t-3xl bg-white">
    <div class="flex px-30 py-15 flex-row justify-between">
      <div class="max-w-xl">
        <div class="flex justify-between items-center mb-10 gap-6">
          <h1 class="text-3xl font-semibold text-[#0a2559] leading-tight">
            Trip to {{ flight.arrival.airport.city }}
          </h1>
          <button
            @click="goBack"
            class="bg-blue-50 text-[14px] text-blue-600 px-2 py-1 rounded-full flex items-center gap-1 font-light"
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
              class="bg-[#3366ff] text-white font-semibold px-2 py-0.5 rounded-sm"
            >
              Depart
            </div>
            <div class="text-gray-800 font-light text-base">
              {{
                new Date(flight.departure.date).toLocaleString("default", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }}
            </div>
            <div>
              <p class="text-gray-300">|</p>
            </div>
            <div
              class="text-gray-600 text-base font-light border-l border-transparent"
            >
              Duration {{ flight.flightDetails.duration }}
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute left-[70px] top-5 bottom-7 w-1 rounded-full bg-gray-200"
          ></div>

          <div class="flex mb-16 relative">
            <div class="w-20 text-base font-semibold text-[#0a2559]">
              {{ flight.departure.time }}
            </div>
            <div class="ml-8 flex-1">
              <h2
                class="text-base font-semibold tracking-wide text-[#0a2559] flex items-center"
              >
                <img
                  src="../../assets/image/flight-takeoff-svgrepo-com.svg"
                  class="w-4.5 h-4.5 mr-3"
                  alt=""
                />
                {{ flight.departure.airport.code }}
                {{ flight.departure.airport.name }}
              </h2>
              <div class="flex items-center mt-5">
                <div class="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    :src="getAirlineLogo(flight.flightDetails.airline)"
                    alt="Airline Logo"
                    class="w-8 h-8 object-cover left-1 absolute"
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
            <div class="w-20 text-base font-semibold text-[#0a2559]">
              {{ flight.arrival.time }}
            </div>
            <div class="ml-8">
              <h2
                class="text-base font-semibold tracking-wide text-[#0a2559] flex items-center"
              >
                <img
                  src="../../assets/image/flight-landing-svgrepo-com.svg"
                  class="w-4.5 h-4.5 mr-3"
                  alt=""
                />
                {{ flight.arrival.airport.code }}
                {{ flight.arrival.airport.name }}
              </h2>
            </div>
          </div>
        </div>

        <div v-if="flight.returnDeparture != null && flight.returnArrival != null" class="mt-10 mb-5">
          <div class="flex gap-4 items-center">
            <div
              class="bg-[#e42a2a] text-white font-semibold px-2 py-0.5 rounded-sm"
            >
              Return
            </div>
            <div class="text-gray-800 font-light text-base">
              {{
                new Date(flight.returnDeparture.date).toLocaleString("default", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }}
            </div>
            <div>
              <p class="text-gray-300">|</p>
            </div>
            <div
              class="text-gray-600 text-base font-light border-l border-transparent"
            >
              Duration {{ flight.flightDetails.duration }}
            </div>
          </div>
        </div>

        <div v-if="flight.returnDeparture != null && flight.returnArrival != null" class="relative">
          <div
            class="absolute left-[70px] top-5 bottom-7 w-1 rounded-full bg-gray-200"
          ></div>

          <div class="flex mb-16 relative">
            <div class="w-20 text-base font-semibold text-[#0a2559]">
              {{ flight.returnDeparture.time }}
            </div>
            <div class="ml-8 flex-1">
              <h2
                class="text-base font-semibold tracking-wide text-[#0a2559] flex items-center"
              >
                <img
                  src="../../assets/image/flight-takeoff-svgrepo-com.svg"
                  class="w-4.5 h-4.5 mr-3"
                  alt=""
                />
                {{ flight.returnDeparture.airport.code }}
                {{ flight.returnDeparture.airport.name }}
              </h2>
              <div class="flex items-center mt-5">
                <div class="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    :src="getAirlineLogo(flight.flightDetails.airline)"
                    alt="Airline Logo"
                    class="w-8 h-8 object-cover left-1 absolute"
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
            <div class="w-20 text-base font-semibold text-[#0a2559]">
              {{ flight.returnArrival.time }}
            </div>
            <div class="ml-8">
              <h2
                class="text-base font-semibold tracking-wide text-[#0a2559] flex items-center"
              >
                <img
                  src="../../assets/image/flight-landing-svgrepo-com.svg"
                  class="w-4.5 h-4.5 mr-3"
                  alt=""
                />
                {{ flight.returnArrival.airport.code }}
                {{ flight.returnArrival.airport.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="bg-white rounded-lg shadow-md max-w-xl p-8 right-30 fixed">
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
    <div class=" min-h-screen">
      <div class="">
        <div class="max-w-3xl mx-auto absolute left-30 mt-10">
          <div class="flex items-center gap-2 mb-6">
            <div
              class="w-5 h-4 rounded-full bg-blue-600 flex items-center justify-center"
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
                <h2
                  class="text-[17px] tracking-wide font-semibold text-black mb-2"
                >
                  Baggage Allowance
                </h2>

                <div class="flex items-center gap-3 space-y-1.5 mb-2">
                  <div class="text-teal-500 mt-1">
                    <img
                      src="../../assets/image/luggage-svgrepo-com.svg"
                      class="w-4 h-4 flex"
                      alt=""
                    />
                  </div>
                  <div class="flex items-center">
                    <span class="text-black text-sm font-light"
                      >Carry-on baggage:
                    </span>
                    <span class="ml-1 text-black text-sm font-semibold">
                      {{ flight.baggageAllowance.carryOn.pieces }} piece</span
                    >
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="text-gray-400">
                    <img
                      src="../../assets/image/briefcase-bag-svgrepo-com.svg"
                      class="w-4 h-4"
                      alt=""
                    />
                  </div>
                  <div>
                    <span class="text-black text-sm font-light"
                      >Checked baggage:
                    </span>
                    <span class="text-black text-sm font-semibold"
                      >1 x
                      {{
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
                <h2
                  class="text-[17px] tracking-wide font-semibold text-black mb-2"
                >
                  Policies
                </h2>

                <div class="flex space-y-1.5 gap-3 mb-2">
                  <div class="text-gray-400 mt-1">
                    <img
                      src="../../assets/image/block-svgrepo-com.svg"
                      class="w-4 h-4"
                      alt=""
                    />
                  </div>
                  <div>
                    <span class="text-black text-sm font-light">{{
                      flight.policies.refundable
                        ? "Refundable"
                        : "Non-refundable"
                    }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div class="text-gray-400 mt-1">
                    <img
                      src="../../assets/image/check-read-svgrepo-com.svg"
                      class="w-4 h-4"
                      alt=""
                    />
                  </div>
                  <div>
                    <span class="text-black text-sm font-light">{{
                      flight.policies.changesPermitted
                        ? "Changes permitted"
                        : "Changes not permitted"
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50  rounded-lg p-6 flex items-center gap-4">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 flex items-center justify-center">
                  <img
                    src="../../assets/image/airplane-plane-svgrepo-com.svg"
                    class="w-14 h-14"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h3 class="text-base font-semibold text-blue-900 mb-1">
                  Ticket Issuing Time
                </h3>
                <p class="text-gray-500 text-xs font-light">
                  Once payment is confirmed, tickets will be issued within 12
                  hours
                </p>
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-6 flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-20 h-20 flex items-center justify-center">
                  <img
                    src="../../assets/image/beach-svgrepo-com.svg"
                    class="w-14 h-14"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h3 class="text-base font-semibold text-blue-900 mb-1">
                  Travel Worry-free
                </h3>
                <p class="text-gray-500 text-xs font-light">
                  With our service guarantee, you know we've got your back!
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
            <UserFrom
              @send-user-form="handleUserInfo"
              :passenger="Number(params.passenger)"
            ></UserFrom>
          </div>
          <div class="mb-10">
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
                        v-model="contact[0].name"
                        placeholder="contact name"
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
                        placeholder="example@mail.com"
                        v-model="contact[0].email"
                        type="email"
                        class="w-full px-4 pt-4 pb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <NotiDialog class="mb-5" v-show="phoneInvalid" message="Phone number must be integer only and must be size 10."></NotiDialog>
                    <div class="relative">
                      <div
                        class="absolute -top-2.5 left-4 bg-white px-1 text-gray-500 text-sm"
                      >
                        Mobile phone
                      </div>
                      <div class="flex">
                        <div
                          class="flex text-sm items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-white"
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
                          v-model="contact[0].phone"
                          type="tel"
                          class="w-full px-4 pt-4 pb-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50/80 rounded-lg p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h2 class="text-lg font-meduim text-gray-800 mb-1">
                        Continue With Your Account
                      </h2>
                      <p class="text-sm font-light text-gray-700">
                        Enter the verification code we've sent to
                        <span class="font-medium">Chu@gmail.com</span> to manage
                        all your bookings in one place
                      </p>
                    </div>
                  </div>

                  <hr class="mb-6 text-gray-200" />

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
                      <span class="text-sm text-gray-700 font-medium"
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
                      <span class="text-sm text-gray-700 font-medium"
                        >Rewards for booking</span
                      >
                    </div>
                  </div>

                  <div class="flex justify-between items-center">
                    <div class="flex-1">
                      <p class="font-light text-gray-700 text-sm">
                        By proceeding, I acknowledge that I have read and agree
                        to Trip.com's
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
          <div class="bg-white px-5 flex-col rounded-lg">
            <div class="flex justify-between items-center pt-3">
              <p class="text-lg font-semibold">Total</p>
              <div class="flex items-center gap-3">
                <p class="text-3xl font-semibold text-blue-500">
                  {{ flight.pricing.currency }}
                </p>
                <p class="text-3xl font-semibold text-blue-500">
                  {{ totalFormat }}
                </p>
              </div>
            </div>
            <div class="pt-3 pb-5">
              <button
                @click="continuePayment"
                class="tracking-wide py-3 w-[100%] rounded-sm bg-blue-500 text-xl font-semibold text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
