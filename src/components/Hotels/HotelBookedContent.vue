<script setup>
import { ref, onMounted } from "vue";
import { getItems, getItemById,deleteItemById } from "../../utils/fetchUtil";
import filterFlightBooked from "../filterFlightBooked.vue";
import FooterComp from ".././FooterComp.vue";
import flightBookedMenu from "../flightBookedMenu.vue";
const bookings = ref([])

const getHotelBooking = async () => {
  try {
    const data = await getItems(
      `${import.meta.env.VITE_APP_URL}/bookingHotel`
    );
    bookings.value = data; 
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await getHotelBooking();
});

</script>

<template>
  
  <div  class="flex flex-row p-6">
    <flightBookedMenu class="w-1/4 mr-6" />
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-md w-3/4">
      <filterFlightBooked :items="bookings" v-slot="{ booked }">
        
        {{ booked.id }} 
        {{ booked.fName }}
      </filterFlightBooked>
    </div>
  </div>
  <FooterComp></FooterComp>
  
</template>

<style scoped></style>