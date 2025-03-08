<script setup>
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";
import Menu from "./components/Menu.vue";
import ProductManager from "./components/ProductManager.vue";
import Navbar from "./components/Navbar.vue";
import MainContent from "./components/MainContent.vue";
</script>

<template>
  <div>
    <!-- <div class="bg-cover bg-opacity bg-[100%_65%] bg-[url('https://wallpapercave.com/wp/wp10535399.jpg')]">
      <Navigation></Navigation>
      <Header></Header>
    </div>  -->
    <div>
      <div><Navbar></Navbar></div>
      <div class="flex flex-row">
        <Menu></Menu>
        <MainContent class=""></MainContent>
      </div>
    </div>
    <!-- <ProductManager></ProductManager>  -->
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
