<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAirlineLogo } from "../../utils/toolUtil.js";
import ListModel from "../ListModel.vue";
import { getItems } from "@/utils/fetchUtil.js";

const { query } = useRoute();
const router = useRouter();

const showMoreOption = ref(false);
const flightOption = ref([]);
const uniqueAirline = ref([]);
const airlines = ref([]);
const temp = ref([]);

const flightFound = ref([]);
const lastUpdated = ref(new Date());
const isLoading = ref(false);
const timeoutId = ref(null);

const fetchFlightData = async () => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  try {
    const leavingCity = encodeURIComponent(query.leavingDestination);
    const goingCity = encodeURIComponent(query.goingDestination);
    
    let url = `${import.meta.env.VITE_APP_URL}/flights?`;
    
    if (query.type === "Round Trip") {
      url += `departure.date=${query.departFlight}&returnDeparture.date=${query.returnFlight}&flightDetails.type=Round%20Trip`;
    } else if (query.type === "One Way") {
      url += `departure.date=${query.departFlight}&flightDetails.type=One%20Way`;
    }
    
    url += `&arrival.airport.city=${goingCity}&departure.airport.city=${leavingCity}&available=true`;
    
    const flights = await getItems(url);
    
    const currentFlightsJson = JSON.stringify(flightFound.value);
    const newFlightsJson = JSON.stringify(flights);
    
    if (currentFlightsJson !== newFlightsJson) {
     
      
      flightFound.value = flights.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
      temp.value = JSON.parse(JSON.stringify(flightFound.value));

      uniqueAirline.value = [];
      flightFound.value.forEach((flight) => {
        const newAirline = flight.flightDetails.airline;
        if (!uniqueAirline.value.includes(newAirline)) {
          uniqueAirline.value.push(newAirline);
        }
      });
      
      lastUpdated.value = new Date();
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
  } finally {
    isLoading.value = false;
    
    timeoutId.value = setTimeout(fetchFlightData, 15000); 
  }
};

onMounted(async () => {
  await fetchFlightData();
});

onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
});

const filterAirline = (airline) => {
  if (airline === "all") {
    flightFound.value = [...temp.value];
    airlines.value = [];
  } else if (!airlines.value.includes(airline)) {
    airlines.value.push(airline);
    flightFound.value = temp.value.filter((f) =>
      airlines.value.includes(f.flightDetails.airline)
    );
  } else if (airlines.value.includes(airline)) {
    airlines.value.splice(
      airlines.value.findIndex((airlineIn) => airlineIn === airline),
      1
    );
    flightFound.value =
      airlines.value.length === 0
        ? [...temp.value]
        : temp.value.filter((f) =>
            airlines.value.includes(f.flightDetails.airline)
          );
  }
};

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
  <div class="flex justify-between px-30"
  :class="flightFound.length === 0 ? '' : 'bg-gray-200/30 h-screen'">
    <div
      class="mt-20 rounded-lg overflow-hidden shadow-lg w-full"
      v-if="flightFound.length === 0"
    >
      <div class="bg-gradient-to-r from-blue-50 to-white p-8">
        <div
          class="flex flex-col items-center justify-center py-10 text-center"
        >
          <div class="relative mb-6">
            <!-- Airplane icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-20 w-20 text-blue-500 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              ></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-300 absolute -top-2 -right-4 transform rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
              ></path>
            </svg>
          </div>

          <div class="space-y-4">
            <h1
              @click="router.go(-1)"
              class="text-3xl font-bold text-blue-700 hover:text-blue-500 transition-colors duration-300 cursor-pointer"
            >
              No flights found
            </h1>

            <p class="text-blue-600 max-w-md">
              We couldn't find any flights matching your search criteria. Please
              try different dates or destinations.
            </p>

            <button
              @click="router.go(-1)"
              class="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Search again
            </button>
          </div>

          <div class="w-full mt-8 flex items-center justify-center">
            <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
            <div class="h-3 w-3 mx-1 rounded-full bg-blue-400"></div>
            <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
            <div class="h-3 w-3 mx-1 rounded-full bg-blue-400"></div>
            <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="flightFound.length !== 0" class="w-[30%] px-10 my-5">
      <div>
        <div>
          <button
            class="w-[100%] flex items-center space-x-4 bg-white px-3 py-1 rounded-md"
          >
            <img
              src="../../assets/image/airplane-departure-svgrepo-com.svg"
              class="w-5 h-5"
              alt=""
            />
            <p class="font-light">Select flights non-stop</p>
          </button>
        </div>
        <div class="flex flex-col space-y-6 mt-5">
          <div class="flex flex-col space-y-2.5 w-[100%]">
            <p>Recommanded</p>

            <div class="flex items-center space-x-1 w-[100%] gap-2.5">
              <div class="flex space-x-2">
                <div class="inline-flex items-center">
                  <label class="flex items-center cursor-pointer relative">
                    <input
                      @click=""
                      type="checkbox"
                      class="peer h-5 w-5 cursor-pointer transition-all appearance-none hover:shadow-md border-2 border-slate-400 checked:bg-blue-900 checked:border-blue-900"
                      id="check6"
                    />
                    <span
                      class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <img
                  src="../../assets/image/flight-ticket-svgrepo-com.svg"
                  class="w-5 h-5"
                  alt=""
                />
              </div>
              <div class="w-[100%] font-light text-[15px]">
                <div class="flex justify-between w-[100%]">
                  <p>Nonstop</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-1.5 w-[100%] gap-2.5">
              <div class="flex space-x-4">
                <div class="inline-flex items-center">
                  <label class="flex items-center cursor-pointer relative">
                    <input
                      @click=""
                      type="checkbox"
                      class="peer h-5 w-5 cursor-pointer transition-all appearance-none hover:shadow-md border-2 border-slate-400 checked:bg-blue-900 checked:border-blue-900"
                      id="check6"
                    />
                    <span
                      class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <div>
                  <img
                    src="../../assets/image/bag-holiday-tourism-2-svgrepo-com.svg"
                    class="w-8 h-8"
                    alt=""
                  />
                </div>
              </div>
              <div class="w-[100%] font-light text-[15px]">
                <div class="flex justify-between w-[100%]">
                  <p>Carry-on baggage includes</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-4 w-[100%]">
            <p>Airlines</p>
            <div>
              <button
                class="px-2 py-1 border-1 font-light border-gray-400 rounded-sm w-[100%]"
                @click="filterAirline('all')"
              >
                All Airlines
              </button>
            </div>
            <ListModel class="space-y-4" :items="uniqueAirline">
              <template #listItems="{ Item: airline }">
                <div class="flex items-center space-x-4 w-[100%] gap-2.5">
                  <div class="flex space-x-4">
                    <div class="inline-flex items-center">
                      <label class="flex items-center cursor-pointer relative">
                        <input
                          @click="filterAirline(airline)"
                          type="checkbox"
                          :checked="airlines.some((a) => airline == a)"
                          :class="
                            airlines.length === 0
                              ? 'checked:none checked:none '
                              : ''
                          "
                          class="peer h-5 w-5 cursor-pointer transition-all appearance-none hover:shadow-md border-2 border-slate-400 checked:bg-blue-900 checked:border-blue-900"
                          id="check6"
                        />
                        <span
                          class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <img
                      :src="getAirlineLogo(airline)"
                      alt="Airline Logo"
                      class="my-auto rounded-full h-5 w-5 object-contain"
                    />
                  </div>
                  <div class="w-[100%]">
                    <div class="flex justify-between w-[100%]">
                      <p class="font-light text-[15px]">{{ airline }}</p>
                      <p class="text-gray-400 font-light text-[15px]">
                        {{
                          `฿ ${
                            temp
                              ?.filter(
                                (flight) =>
                                  flight.flightDetails.airline == airline
                              )
                              .sort(
                                (a, b) =>
                                  a.pricing.basePrice - b.pricing.basePrice
                              )[0].pricing.basePrice
                          }`
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </ListModel>
          </div>
        </div>
      </div>
    </div>

    <div v-if="flightFound.length !== 0" class="w-[70%] py-5">
      <div
        class="bg-[url('/headerflight.png')] bg-[center_60px] px-4 py-3.5 rounded-t-xl flex justify-between items-center"
      >
        <div>
          <p class="text-base tracking-wide font-medium text-white">
            {{ query.type }} to {{ query.goingDestination }}
          </p>
        </div>
        <div class="flex items-center">
          <p class="text-sm text-white font-thin">
            อัพเดทล่าสุด {{ lastUpdated.toLocaleTimeString() }}
            <span class="ml-1 inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </p>
        </div>
      </div>
      <div class="">
        <ListModel :items="flightFound">
          <template #listItems="{ Item: flight }">
            <div class="relative max-w-5xl mx-auto my-3">
              <div
                class="font-light text-[13px] absolute top-0 left-0 bg-linear-65 from-purple-500 to-pink-500 text-white px-4 py-0.5 rounded-tl-xl rounded-br-xl z-10"
                v-if="
                  flight.pricing.basePrice ===
                  Math.min(...flightFound.map((f) => f.pricing.basePrice))
                "
              >
                Cheapest nonstop
              </div>
              <div
                class="card bg-white px-6 py-3.5 rounded-lg hover:shadow-lg hover:shadow-gray-300 duration-300"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="flex w- items-center space-x-8">
                      <div class="relative h-12 w-12">
                        <img
                          :src="getAirlineLogo(flight.flightDetails.airline)"
                          alt="Airline Logo"
                          class="rounded-full h-12 w-12 object-contain"
                        />
                      </div>

                      <div class="flex items-center ml-5 mt-5 space-x-4">
                        <div class="w-[80px] text-center">
                          <div class="text-2xl font-semibold">
                            {{ flight.departure.time }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ flight.departure.airport.code }}
                          </div>
                        </div>

                        <div class="flex flex-col gap-2.5 items-center px-4">
                          <div
                            class="text-xs font-light text-blue-600 px-3 py-1 rounded-full flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3 w-3 mr-1 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {{ flight.flightDetails.duration }}
                          </div>
                          <div class="relative w-32 my-2">
                            <div
                              class="w-full h-[2px] bg-gradient-to-r from-[#b5daff] to-[#2d73ff]"
                            ></div>
                            <div
                              class="absolute -left-1 -top-1 w-2 h-2 rounded-xl bg-[#63adf8]"
                            ></div>
                            <div
                              class="absolute -right-1 -top-1 w-2 h-2 rounded-xl bg-[#095bff]"
                            ></div>
                            <div
                              class="absolute top-[-5px] left-1/2 transform -translate-x-1/2"
                            >
                              <img
                                src="../../assets/image/plane-take-off-transportation-transport-plane-svgrepo-com.svg"
                                class="w-3 h-3"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            class="text-xs font-light text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3 w-3 mr-1 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {{ flight.flightDetails.nonstop }}
                          </div>
                        </div>

                        <div class="text-center">
                          <div class="w-[80px] text-2xl font-semibold">
                            {{ flight.arrival.time }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ flight.arrival.airport.code }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="
                        flight.returnDeparture != null &&
                        flight.returnArrival != null
                      "
                      class="flex items-center space-x-8"
                    >
                      <div class="relative h-12 w-12">
                        <img
                          :src="getAirlineLogo(flight.flightDetails.airline)"
                          alt="Airline Logo"
                          class="rounded-full h-12 w-12 object-contain"
                        />
                      </div>

                      <div class="flex items-center ml-5 mt-5 space-x-4">
                        <div class="w-[80px] text-center">
                          <div class="text-2xl font-semibold">
                            {{ flight.returnDeparture.time }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ flight.returnDeparture.airport.code }}
                          </div>
                        </div>

                        <div class="flex flex-col gap-2.5 items-center px-4">
                          <div
                            class="text-xs font-light text-blue-600 px-3 py-1 rounded-full flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3 w-3 mr-1 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {{ flight.flightDetails.duration }}
                          </div>
                          <div class="relative w-32 my-2">
                            <div
                              class="w-full h-[2px] bg-gradient-to-r from-[#b5daff] to-[#2d73ff]"
                            ></div>
                            <div
                              class="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-[#63adf8]"
                            ></div>
                            <div
                              class="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-[#095bff]"
                            ></div>
                            <div
                              class="absolute top-[-5px] left-1/2 transform -translate-x-1/2"
                            >
                              <img
                                src="../../assets/image/plane-take-off-transportation-transport-plane-svgrepo-com.svg"
                                class="w-3 h-3"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            class="text-xs font-light text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3 w-3 mr-1 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {{ flight.flightDetails.nonstop }}
                          </div>
                        </div>

                        <div class="text-center">
                          <div class="w-[80px] text-2xl font-semibold">
                            {{ flight.returnArrival.time }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ flight.returnArrival.airport.code }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center mt-4">
                    <div
                      class="flex flex-col justify-center items-end space-y-1"
                    >
                      <div class="text-right items-center">
                        <div class="flex items-center gap-2">
                          <span
                            class="text-lg mx-auto font-semibold pl-2 py-1 text-blue-700"
                            >{{ flight.pricing.currency }}</span
                          >
                          <span
                            class="text-[25px] font-semibold text-[#3366FF]"
                            >{{ flight.pricing.basePrice }}</span
                          >
                        </div>
                      </div>
                      <button
                        @click="toggleShowOption(flight.id)"
                        class="bg-[#3366FF] hover:bg-[#2952CC] w-[100%] text-white py-1.5 px-0 rounded-md"
                      >
                        {{
                          showMoreOption && flightOption.includes(flight.id)
                            ? "Hide"
                            : "Select"
                        }}
                      </button>
                    </div>
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
                  class="flex bg-gray-100/50 shadow-lg p-1 rounded-lg"
                >
                  <ListModel
                    class="flex"
                    :items="flight.pricing.baggageOptions"
                  >
                    <template #listItems="{ Item: option }">
                      <div
                        class="p-7 bg-white m-3 w-[350px] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
                      >
                        <h1
                          class="font-semibold text-black text-xl tracking-wide"
                        >
                          {{ flight.flightDetails.class }} class
                        </h1>
                        <hr class="text-gray-200 mb-3 mt-3" />
                        <div class="mt-3 mb-3 space-y-3">
                          <p class="font-semibold font-sm tracking-wide">
                            Bagage
                          </p>
                          <div class="flex flex-row gap-2">
                            <p>
                              <img
                                src="../../assets/image/luggage-svgrepo-com.svg"
                                class="w-5 h-6"
                                alt=""
                              />
                            </p>
                            <p class="font-light text-[15px]">
                              Carry-on baggage:
                            </p>
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
                            <p class="text-[15px] font-light">
                              Checked baggage:
                            </p>
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
                            <span v-if="flight.policies.refundable"
                              >Refundable</span
                            >
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
                            class="bg-blue-500 text-white w-[100%] text-base rounded-md tracking-wide py-2"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </template>
                  </ListModel>
                </div>
              </transition>
            </div>
          </template>
        </ListModel>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 1.5s infinite;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
