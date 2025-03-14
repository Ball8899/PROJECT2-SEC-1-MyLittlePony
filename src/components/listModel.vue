<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <slot name="listItems" :Item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>