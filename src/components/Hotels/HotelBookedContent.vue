<script setup>
import { ref, onMounted } from "vue";
import { getItems, getItemById, deleteItemById } from "../../utils/fetchUtil";
import filterFlightBooked from "../AppFilter.vue";
import FooterComp from "../FooterComp.vue";
import flightBookedMenu from "../AppBookedMenu.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useBooking } from "../../store/booking.js";

const router = useRouter();

const bookingStore = useBooking();
const { hotelBookings } = storeToRefs(bookingStore);
const { getHotel } = bookingStore;
const hotels = ref([]);

const getHotelBooking = async () => {
  try {
    const data = await getItems(`${import.meta.env.VITE_APP_URL}/bookingHotel`);

    getHotel(data[0].id, data);
    hotels.value = hotelBookings.value[0].hotel;
  } catch (error) {
    console.log(error);
  }
};

const deleteCancelledBooking = async (bookingId) => {
  try {
    await deleteItemById(
      `${import.meta.env.VITE_APP_URL}/bookingHotel`,
      bookingId
    );
    hotelBookings.value = hotelBookings.value.filter(
      (booking) => booking.id !== bookingId
    );
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  hotelBookings.value = [];

  await getHotelBooking();
});

const routerBookingDetail = (id) => {
  router.push({ name: "BookingHotelDetail", params: { id } });
};
</script>

<template>
  <div class="flex flex-row p-6">
  <flightBookedMenu class="w-1/4 mr-6" />
  <div class="flex flex-col bg-white p-6 rounded-lg shadow-md w-3/4">
    <filterFlightBooked :items="hotels" v-slot="{ booked }">
      <div
        class="border border-gray-200 rounded-lg p-4 mb-4 shadow max-h-178 overflow-y-auto"
      >
        <div class="flex flex-col cursor-pointer" @click="routerBookingDetail(booked.id)">
          <div class="flex justify-between items-center border-b pb-2">
            <div>
              <span class="text-sm text-gray-500">
                Booking ID: {{ booked.id }}
              </span>
            </div>
            <span class="text-sm text-blue-500">
              Booking Date: {{ booked.dateBooking }}
            </span>
          </div>

          <div class="flex items-center">
            <img
              class="w-48 mt-3 ml-3 rounded-md"
              src="../../assets/hotels/hotel2.jpg"
              alt=""
            />
            <div class="ml-7">
              <p class="text-lg font-semibold">{{ booked.hotelName }}</p>
              <div class="items-center space-x-4 text-gray-500 text-sm mt-1">
                <span class="text-green-500">
                  Check In: {{ booked.checkInDate }} {{ booked.checkInTime }}
                </span>
                <span
                  class="inline-block mb-1 w-14 h-0.5 bg-gray-300 my-auto"
                ></span>
                <span class="text-red-500">
                  Check Out: {{ booked.checkOutDate }}
                  {{ booked.checkOutTime }}
                </span>
              </div>
            </div>

            <div class="ml-auto text-right">
              <p class="text-xl font-bold text-gray-800">
                ฿ {{ booked.price }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-2">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            v-if="booked.approve !== 'Cancelled'"
          >
            Payment
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            v-if="booked.approve == 'Cancelled'"
            @click="deleteCancelledBooking(booked.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </filterFlightBooked>
  </div>
</div>

</template>

<style scoped></style>
