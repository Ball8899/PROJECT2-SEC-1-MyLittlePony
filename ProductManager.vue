<script setup>
import ProductList from "./ProductList.vue";
import products from "../../data/products.json"
</script>

<template>
  <div>
    <ProductList :products="products"></ProductList>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
