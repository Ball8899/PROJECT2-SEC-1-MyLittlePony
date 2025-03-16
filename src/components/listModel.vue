<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="">
    <div v-for="(item, index) in items" :key="index">
      <slot name="listItems" :Item="item"></slot>
    </div>
  </div>
</template>

<style scoped></style>
