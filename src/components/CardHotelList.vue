<script setup>
import { ref } from "vue";
import ListModel from "./ListModelOfHotel.vue";
import CardModel from "./CardModel.vue";
import hotels from "../../data/Hotels.json";



</script>

<template>
  <div class="">

    
    <ListModel :items="hotels">
      <template #header> Name </template>
      <template #filterName>

      </template>
      

      <template #List="{ Item }">
        <CardModel >
          <template #image>
            <img src="https://picsum.photos/300/200" alt="">
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
    </ListModel>

    <ListModel :items="hotels">
      <template #header> Name </template>
      <template #filterName >

      </template>
      

      <template v-slot:List="{ Item }">
        <CardModel>
          <template #image>
            <img src="https://picsum.photos/300/200" alt="">
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
    </ListModel>

    <ListModel :items="hotels">
      <template #header> Name </template>
      <template #filterName >

      </template>
      

      <template v-slot:List="{ Item }">
        <CardModel>
          <template #image>
            <img src="https://picsum.photos/300/200" alt="">
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
    </ListModel>



    

  </div>
  
</template>
