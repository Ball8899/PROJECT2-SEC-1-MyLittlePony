<script setup>
import ListModel from './model/ListModel.vue';
defineProps({
    products: {
        type: Array,
        required: true
    },
})
</script>

<template>
  <div>
    <ListModel :items="products">
        <template #heading>Product List</template>
        <template v-slot:listItems="{ xxx }">
            <p>
                <span>id:</span>{{ xxx.productId }}
                <span>price:</span>{{ xxx.productName }}
            </p>
        </template>

    </ListModel>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
