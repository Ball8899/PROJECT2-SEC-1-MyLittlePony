<script setup>
import { ref, onMounted } from "vue";
import { getItems, getItemById, deleteItemById } from "@/utils/fetchUtil";
import filterFlightBooked from "./filterFlightBooked.vue";
import Menu from "./Menu.vue";
import FooterComp from "./FooterComp.vue";
import flightBookedMenu from "./flightBookedMenu.vue";

const flightsBooking = ref([]);

const getFlights = async (flightId, booking) => {
  try {
    const flight = await getItemById(
      `${import.meta.env.VITE_APP_URL}/flights`,
      flightId
    );
    flightsBooking.value.push({ ...booking, flight });
  } catch (error) {
    console.log(error);
  }
};

const getFlightsBooking = async () => {
  try {
    const bookings = await getItems(
      `${import.meta.env.VITE_APP_URL}/flightBooking`
    );
    flightsBooking.value = [];
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
const deleteCancelledBooking = async (bookingId) => {
  try {
    await deleteItemById(
      `${import.meta.env.VITE_APP_URL}/flightBooking`,
      bookingId
    );
    flightsBooking.value = flightsBooking.value.filter(
      (booking) => booking.id !== bookingId
    );

    console.log(`Deleted booking ID: ${bookingId}`);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="flex flex-row p-6">
    <flightBookedMenu class="w-1/4 mr-6" />
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-md w-3/4">
      <filterFlightBooked :items="flightsBooking" v-slot="{ booked }">
        <div
          class="border border-gray-200 rounded-lg p-4 mb-4 shadow max-h-178 overflow-y-auto"
        >
          <div class="flex justify-between items-center border-b pb-2">
            <div>
              <span class="text-sm text-gray-500">Booking ID:</span>
              <a href="#" class="text-blue-500 ml-2">{{ booked.id }}</a>
            </div>
            <span class="text-sm text-gray-500"
              >Booking Date:
              {{ new Date(booked.bookingDate).toLocaleDateString() }}</span
            >
          </div>

          <div class="flex items-center mt-4">
            <div>
              <p class="text-lg font-semibold">
                {{ booked.flight.departure.airport.city }} ({{
                  booked.flight.departure.airport.code
                }}) → {{ booked.flight.arrival.airport.city }} ({{
                  booked.flight.arrival.airport.code
                }})
              </p>
              <div
                class="flex items-center space-x-4 text-gray-500 text-sm mt-1"
              >
                <span>{{ booked.flight.departure.time }}</span>
                <span>-</span>
                <span>{{ booked.flight.arrival.time }}</span>
                <span class="text-blue-500 font-medium">{{
                  booked.flight.flightNumber
                }}</span>
                <span>{{ booked.flight.airline }}</span>
              </div>
              <p class="text-gray-600 mt-2">
                Passenger: {{ booked.passenger[0].firstName }}
                {{ booked.passenger[0].lastName }}
              </p>
            </div>
            <div class="ml-auto text-right">
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
      </filterFlightBooked>
    </div>
  </div>
  <FooterComp></FooterComp>
</template>

<style scoped></style>
