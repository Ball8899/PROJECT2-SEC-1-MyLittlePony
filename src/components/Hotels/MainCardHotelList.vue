<script setup>
import { ref, onMounted, defineEmits } from "vue";
import CardModel from "../CardModel.vue";
import { getHotels } from "../../utils/fetchUtil";
import ListModelofHotel from "./ListModelofHotel.vue";
import { useRoute } from "vue-router";

defineEmits(["sendRoomId"])
const hotels = ref([]);
const receivedRoomId = ref(null)
const route = useRoute()
onMounted(async () => {
  try {
    hotels.value = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
  } catch (error) {
    console.log(error);
  }
});

const validateRoomId = ((roomId) => {
  receivedRoomId.value = roomId
})

</script>

<template>
  <div v-if="['','/'].includes(route.path) && !receivedRoomId" @sendRoomId="validateRoomId"    class="">
    <ListModelofHotel :items="hotels">
      <template #header class="hidden"> Name </template>
      <template #Topics>Featured Properties </template>
      <template #List="{ Item }">
        <router-link  :to="{ name: 'hotelDetail', params: { hotelId: Item.id } }">
          <CardModel>
          <template #image>
            <img src="../../assets/hotels/hotel2.jpg" alt="">
          </template>
          <template #hotelRating>
            {{ Item.rating }}
          </template>
          <template #hotelName>
            {{ Item.name }}
          </template>
          <template #hoteladdress>
            {{ Item.address }}
          </template>
          <template #hotelPrice>
            {{ Item.price }}
          </template>
        </CardModel>
        </router-link>
      </template>
    </ListModelofHotel>
  </div>
  </template>

