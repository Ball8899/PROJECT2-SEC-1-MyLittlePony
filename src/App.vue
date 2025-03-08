<script setup>
import Menu from "./components/Menu.vue";
import Navbar from "./components/Navbar.vue";
import MainContent from "./components/MainContent.vue";
</script>

<template>
  <div>
    <div>
      <div><Navbar></Navbar></div>
      <div class="flex flex-row">
        <Menu></Menu>
        <MainContent class=""></MainContent>
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
