<script setup>
import ListModel from './model/ListModel.vue';
import groups from '../../data/groups.json'
</script>

<template>
  <div>
    <ListModel :items="groups" v-slot="slotProps">
        <p>
            <span>id:</span>{{ slotProps.item.ID }}
            <span>group name:</span>{{ slotProps.item.groupName }}
        </p>
    </ListModel>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
