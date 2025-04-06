<script setup>
import { ref, onMounted } from "vue";
import { getItems, getItemById, deleteItemById } from "../utils/fetchUtil";
import filterFlightBooked from "./filterFlightBooked.vue";
import FooterComp from "./FooterComp.vue";
import flightBookedMenu from "./flightBookedMenu.vue";
import { storeToRefs } from "pinia";
import { useBooking } from "../store/booking.js";
import { useRouter } from "vue-router";
import { getAirlineLogo } from "@/utils/toolUtil";

const bookingStore = useBooking();
const { flightsBookings } = storeToRefs(bookingStore);
const { getBooking } = bookingStore;
const router = useRouter();
const bookingId = ref("");

const getFlights = async (flightId, booking) => {
  try {
    const flight = await getItemById(
      `${import.meta.env.VITE_APP_URL}/flights`,
      flightId
    );
    bookingId.value = booking.id;
    getBooking(flight, booking);
  } catch (error) {
    console.log(error);
  }
};

const getFlightsBooking = async () => {
  try {
    const bookings = await getItems(
      `${import.meta.env.VITE_APP_URL}/flightBooking`
    );
    flightsBookings.value = [];
    for (const booking of bookings) {
      await getFlights(booking.flight, booking);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await getFlightsBooking();
});

const routerTo = (id) => {
  router.push({ name: "BookingDetail", params: { id } });
};

const deleteCancelledBooking = async (bookingId) => {
  try {
    await deleteItemById(
      `${import.meta.env.VITE_APP_URL}/flightBooking`,
      bookingId
    );
    flightsBookings.value = flightsBookings.value.filter(
      (booking) => booking.id !== bookingId
    );

    console.log(`Deleted booking ID: ${bookingId}`);
  } catch (error) {
    console.log(error);
  }

  router.push({
        name: "flightBookedContent"
    })
};
</script>

<template>
  <div class="flex flex-row p-6">
    <flightBookedMenu class="w-1/4 mr-6" />
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-md w-3/4" >
      <filterFlightBooked :items="flightsBookings" v-slot="{ booked }">
        <div
          class="border border-gray-200 rounded-lg p-4 mb-4 shadow max-h-178 overflow-y-auto cursor-pointer"
          @click="routerTo(booked.id)"
                
        >
          <div class="flex justify-between items-center border-b pb-2">
            <div>
              <span class="text-sm text-gray-500">Booking ID:</span>
              <p
                @click="routerTo(booked.id)"
                class="text-blue-500 ml-2 cursor-pointer"
              >
                {{ booked.id }}
              </p>
            </div>
            <span class="text-sm text-gray-500"
              >Booking Date:
              {{ new Date(booked.bookingDate).toLocaleDateString() }}</span
            >
          </div>

          <div class="flex items-center mt-4">
            <img
              :src="getAirlineLogo(booked.flight.flightDetails.airline)"
              alt="Airline Logo"
              class="w-15 h-15 object-contain mb-2"
            />
            <div class="px-5">
              <p class="text-lg font-semibold">
                {{ booked.flight.departure.airport.city }} ({{
                  booked.flight.departure.airport.code
                }}) → {{ booked.flight.arrival.airport.city }} ({{
                  booked.flight.arrival.airport.code
                }})
              </p>
              <div
                class="flex items-center space-x-4 text-black text-sm mt-1"
              >
                <span>{{ booked.flight.departure.time }}</span>
                <span class="inline-block w-5 h-0.5 bg-black my-auto"></span>
                <span>{{ booked.flight.arrival.time }}</span>

                <span class="text-blue-500 font-medium"
                >{{
                  booked.flight.flightDetails.flightNumber
                }}</span>
                <span>{{ booked.flight.flightDetails.airline }}</span>
              </div>
              <p class="text-black mt-2">
                Passenger: {{ booked.passenger[0].firstName }}
                {{ booked.passenger[0].lastName }}
              </p>
            </div>
            <div class="ml-auto text-right">
              <div class="ml-auto text-right flex flex-col items-end">
                <p class="text-xl font-bold text-gray-800">
                  ฿ {{ booked.flight.pricing.basePrice.toLocaleString() }}
                </p>

                <button
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                  v-if="booked.approve != 'Cancelled'"
                >
                  Payment
                </button>
                <button
                  @click="deleteCancelledBooking(booked.id)"
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                  v-if="booked.approve == 'Cancelled'"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </filterFlightBooked>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>

<style scoped></style>
