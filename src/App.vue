<script setup>
import Menu from "./components/Menu.vue";
import Navbar from "./components/Navbar.vue";
import MainContent from "./components/MainContent.vue";
import FlightList from "./components/FlightList/FlightList.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import FooterComp from "./components/FooterComp.vue";
import MainCardHotelList from "./components/Hotels/MainCardHotelList.vue";
import FlightListAdmin from "./components/admin/FlightListAdmin.vue";
import { getItems } from "@/utils/fetchUtil";
import { useFlight } from "./store/flight.js";
import MainCardFlightList from "./components/FlightList/MainCardFlightList.vue";

const { setFlights, getFlights } = useFlight();

onMounted(async () => {
  try {
    if (getFlights().length === 0) {
      const flights = await getItems(`${import.meta.env.VITE_APP_URL}/flights`);
      setFlights(flights);
    } else {
    }
  } catch (error) {
    console.error("Error fetching flights in App.vue:", error);
  }
});

const route = useRoute();

const resetShow = ref(false);
</script>

<template>
  <div @click="resetShow = true">
    <div>
     <div class="w-full bg-white">
       <Navbar></Navbar>
     </div>
      <router-view></router-view>
      <div v-if="['', '/'].includes(route.path)" class="flex flex-row">
        <Menu class="w-[20%] fixed"></Menu>
        <div class="w-[80%] ml-[20%]">
          <MainContent
          @update="resetShow = false"
          :show-toggle="resetShow"
        ></MainContent>
        <MainCardFlightList class="p-20"></MainCardFlightList>
        <MainCardHotelList></MainCardHotelList>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
