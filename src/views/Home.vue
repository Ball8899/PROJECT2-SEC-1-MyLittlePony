<script setup>
import { ref } from "vue";
import Menu from "../components/Menu.vue";
import MainContent from "../components/MainContent.vue";
import MainCardFlightList from "../components/FlightList/MainCardFlightList.vue";
import MainCardHotelList from "../components/Hotels/MainCardHotelList.vue";

// Reactive variable to control MainContent toggle
const resetShow = ref(false);
</script>

<template>
  <div @click="resetShow = true">
    <div class="flex flex-row">
      <Menu class="w-[17%] fixed" />
      <div class="w-[83%] ml-[17%]">
        <MainContent
          @update="resetShow = false"
          :show-toggle="resetShow"
        />
        <MainCardFlightList class="p-20" />
        <MainCardHotelList />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  /* Responsive styles for desktop */
}
</style>