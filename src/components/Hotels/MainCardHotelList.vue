<script setup>
import { ref, onMounted, defineEmits } from "vue";
import CardModel from "../CardModel.vue";
import { getHotels } from "../../utils/fetchUtil";
import ListModelofHotel from "./ListModelofHotel.vue";


defineEmits(["sendRoomId"])
const hotels = ref([]);
const receivedRoomId = ref(null)

onMounted(async () => {
  try {
    hotels.value = await getHotels(`http://localhost:3000/hotels`);
  } catch (error) {
    console.log(error);
  }
});

const validateRoomId = ((roomId) => {
  receivedRoomId.value = roomId
})

</script>

<template>
  <div v-if="$route.name === '' && !receivedRoomId" @sendRoomId="validateRoomId"    class="">
    <ListModelofHotel :items="hotels">
      <template #header class="hidden"> Name </template>
      <template #Topics>Name</template>
      <template #List="{ Item }">
        <router-link  :to="{ name: 'hotelDetail', params: { hotelId: Item.id } }">
          <CardModel>
          <template #image>
            <img :src="Item.image" alt="" />
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

