<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFlight } from "./store/flight.js";
import { getItems } from "@/utils/fetchUtil";
import FooterComp from "./components/FooterComp.vue";
import Navbar from "./components/Navbar.vue";

const { setFlights, getFlights } = useFlight();

const route = useRoute();
onMounted(async () => {
  try {
    if (getFlights().length === 0) {
      const flights = await getItems(`${import.meta.env.VITE_APP_URL}/flights`);
      setFlights(flights);
    }
  } catch (error) {
    console.error("Error fetching flights in App.vue:", error);
  }
});
</script>

<template>
  <div>
    <div class="w-full bg-white">
      <Navbar v-if="!['/login', '/admin-panel', '/page-not-found'].includes(route.path)" />
    </div>
    
    <router-view></router-view>
    <FooterComp class="ml-[17%]"></FooterComp>
  </div>
  
</template>

<style scoped>
/* Global styles can go here */
</style>