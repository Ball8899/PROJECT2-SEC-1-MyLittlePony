<script setup>
import Menu from "./components/Menu.vue";
import Navbar from "./components/Navbar.vue";
import MainContent from "./components/MainContent.vue";
import FlightList from './components/FlightList/FlightList.vue'
import { ref, watch } from 'vue'
import { useRoute } from "vue-router";
import FooterComp from "./components/FooterComp.vue";
const route = useRoute()
console.log(route);

const resetShow = ref(false)

</script>

<template>
  <div @click="resetShow = true">
    <div>
      <div><Navbar></Navbar></div>
      <router-view></router-view>
          <div v-if="['','/'].includes(route.path)"  class="flex flex-row">
            <Menu class="w-[20%]"></Menu>
            <MainContent @update="resetShow = false" :show-toggle="resetShow" class="w-[80%]"></MainContent>
          </div> 

    </div>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
