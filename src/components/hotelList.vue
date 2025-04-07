<script setup>
import groups from "../../data/groups.json";
import listModel from "./ListModel.vue";
</script>

<template>
  <div class="flex">
    <listModel :items="groups" v-slot="hotelList">
      <div class="relative flex bg-white w-auto h-auto p-4 mt-5">
        <img
          :src="hotelList.hotelDetail.img"
          alt="Group Image"
          class="object-cover rounded-md w-40"
        />

        <div class="flex flex-col justify-between flex-grow p-2">
          <div>
            <span>id: </span>{{ hotelList.hotelDetail.ID }},
            <span>group name:</span> {{ hotelList.hotelDetail.groupName }}
          </div>

          <button
            class="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Check In
          </button>
        </div>
      </div>
    </listModel>
  </div>
</template>

<style scoped></style>
