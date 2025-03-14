<script setup>
import { ref, onMounted, computed } from "vue";
import CardModel from "./CardModel.vue";
import { getHotels } from "./HotelfetchUtils";

import ListModelofHotel from "./ListModelofHotel.vue";

import Hotel from "../../../data/Hotels.json";

const hotels = ref([]);

// onMounted(async () => {
//   try {
//     hotels.value = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
//   } catch (error) {
//     console.log(error);
//   }
// });



</script>

<template>
  <div class="">
    <ListModelofHotel :items="Hotel">
      <template #header> Name </template>
      <template #filterName> </template>

      <template #List="{ Item }">
        <CardModel>
          <template #image>
            <img src="https://picsum.photos/300/200" alt="" />
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
      </template>
    </ListModelofHotel>

    <ListModelofHotel :items="Hotel">
      <template #header> Name </template>
      <template #filterName> </template>

      <template v-slot:List="{ Item }">
        <CardModel>
          <template #image>
            <img src="https://picsum.photos/300/200" alt="" />
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
      </template>
    </ListModelofHotel>

    <ListModelofHotel :items="Hotel">
      <template #header> Name </template>
      <template #filterName> </template>

      <template v-slot:List="{ Item }">
        <CardModel>
          <template #image>
            <img src="https://picsum.photos/300/200" alt="" />
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
      </template>
    </ListModelofHotel>
  </div>
</template>
