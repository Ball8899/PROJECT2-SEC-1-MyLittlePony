<script setup>
import Menu from "./components/Menu.vue";
import Navbar from "./components/Navbar.vue";
import MainContent from "./components/MainContent.vue";
import { ref, watch } from 'vue'
const resetShow = ref(false)

</script>

<template>
  <div @click="resetShow = true">
    <div>
      <div><Navbar></Navbar></div>
      <div class="flex flex-row">
        <Menu></Menu>
        <MainContent @update="resetShow = false" :show-toggle="resetShow" class=""></MainContent>
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
