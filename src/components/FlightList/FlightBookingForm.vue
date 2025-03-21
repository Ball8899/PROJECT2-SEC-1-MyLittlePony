<script setup>
import { useRoute } from 'vue-router'
const { query } = useRoute()
console.log(query);

</script>

<template>
  <div>
    <h1>{{ `Trip to ${query.goingDestination}` }}</h1>
  </div>
</template>

<style scoped>
</style>