<script setup>
import Navbar from "../components/Navbar.vue";
import { computed, onMounted, ref, defineEmits } from "vue";
import { getHotelById } from "../utils/fetchUtil";
import { useRoute, useRouter } from "vue-router";
import ListRoom from "../components/Hotels/ListRoom.vue";

const route = useRoute();
const router = useRouter();
const hotels = ref({});
const emit = defineEmits(["sendRoomId"]);
const selectedRoomId = ref("");
const rooms = ref([]);

const hotelID = computed(() => {
  const id = route.params.hotelId;
  if (!id || isNaN(Number(id))) {
    console.error(`Invalid ID: ${id} is not a number`);
    return;
  }
  return Number(id);
});

onMounted(async () => {
  try {
    if (!hotelID.value) {
      console.log("not Number");
      return
    }
    hotels.value = await getHotelById(`${import.meta.env.VITE_APP_URL}/hotels`,
      hotelID.value
    );
    if (hotels.value && hotels.value.rooms) {
      rooms.value = hotels.value.rooms;
    }
  } catch (error) {
    console.log(error);
  }
});

const selectPayment = (roomId, hotelId, optionId) => {
  if (!roomId || !hotelId || optionId === null) {
    console.log("'not found room ID or not found Hotel ID or optionId is null'");
    return;
  }
  try {
    selectedRoomId.value = roomId;
    router.push({
      name: "BookingHotels",
      params: { roomId, hotelId, optionId }
    });
  } catch (error) {
    console.error("Navigation error:", error);
  }
};


const sendRoomId = () => {
  if (selectedRoomId.value) {
    emit("sendRoomId", selectedRoomId.value);
  } else {
    return "no room ID";
  }
};

const activeReserve = (roomId, hotelId,optionId) => {
  if(roomId && hotelID.value){
    selectPayment(roomId, hotelId,optionId);
    sendRoomId();
  }
  else{
    return "Invalid roomId or hotelID"
  }
};
</script>

<template>

  <div
    v-if="hotels"
    class="transition-transform max-h-600 duration-700 ease-in-out bg-gray-100 h-500 w-full rounded-t-3xl"
  >
    <h1
      @click="router.go(-1)"
      class="ml-21 top-35 hover:underline cursor-pointer text-blue-600 absolute font-semibold text-xl"
    >
      Back
    </h1>
    <div
      class="bg-white rounded-lg absolute w-7xl max-w-7xl h-108 top-48 left-1/2 -translate-x-1/2 shadow-base"
    >
      <div>
        <h1 class="text-3xl font-semibold p-5 pb-3">{{ hotels.name }}</h1>
        <div class="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide absolute lucide-map-pin"
          >
            <path
              d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
            />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span class="font-normal ml-2 text-gray-500 text-base p-5">
            {{ hotels.address }}
          </span>
        </div>

        <h1
          class="absolute text-xl text-white font-semibold cursor-pointer hover:bg-blue-700 rounded-lg bg-blue-600 h-13 justify-center items-center flex inset-y-0 right-5 top-5 w-35"
        >
          Select Room
        </h1>
      </div>

      <div class="flex">
        <slot name="MainPhotoOfHeader">
          <img
            src="../assets/hotels/hotel2.jpg"
            class="w-md h-78 ml-5 mt-3 m-2 rounded-sm"
          />
        </slot>
        <div class="mt-3 grid grid-cols-3 grid-rows-2 gap-2">
          <slot name="SubPhotoOfHeader">
            <img
              src="../assets/hotels/hotel.jpg"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
              src="../assets/hotels/hotel.jpg"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
            src="../assets/hotels/hotel.jpg"
            class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
            src="../assets/hotels/hotel.jpg"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
            src="../assets/hotels/hotel.jpg"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
            src="../assets/hotels/hotel.jpg"
              class="w-64 ml-0 h-37 rounded-sm"
            />
          </slot>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-lg absolute w-7xl h-auto pb-6 top-163 left-1/2 -translate-x-1/2 shadow-base"
    >
      <div class="flex border-b border-gray-200 text-slate-600">
        <h1 class="text-lg font-semibold p-5 pb-3">Overview</h1>
        <h1 class="text-lg font-semibold p-5 pb-3">Rooms</h1>
      </div>

      <div class="p-3 pl-6 pb-0">
        <h1 class="font-semibold pb-2 text-xl">Highlights</h1>
        <div class="rounded-lg space-x-32 flex w-180 bg-gray-100">
          <h1 class="p-8 content-center">
            <img
              class="w-12 ml-3"
              src="https://dimg04.tripcdn.com/images/1re4c12000g27h34z6EF4.png"
              alt=""
            />
            Breakfast
          </h1>
          <h1 class="p-8">
            <img
              class="w-12 ml-3"
              src="https://dimg04.tripcdn.com/images/1re4c12000g27h34z6EF4.png"
              alt=""
            />
            Breakfast
          </h1>
          <h1 class="p-8">
            <img
              class="w-12 ml-3"
              src="https://dimg04.tripcdn.com/images/1re4c12000g27h34z6EF4.png"
              alt=""
            />
            Breakfast
          </h1>
        </div>
      </div>
      <div
        class="bg-white absolute left-218 top-20 p-4 border-gray-300 border-l border-r w-96"
      >
        <div class="flex items-center mb-2">
          <span class="bg-blue-700 text-white px-2 py-1 rounded-lg font-bold"
            >{{ hotels.rating }}
          </span>
          <h2 class="text-lg font-bold text-blue-900 ml-2">Very Good</h2>
        </div>
        <p class="text-gray-600 mb-2">
          Family friendly, staff very nice and hotel very clean
        </p>
        <a href="#" class="text-blue-600 font-medium">All Reviews</a>

        <hr class="my-3 border-gray-300" />

        <div>
          <h3 class="text-lg font-bold text-blue-900 flex items-center">
            <span class="bg-gray-200 p-2 rounded-lg mr-2"> 📍 </span>
            Surroundings
          </h3>
          <div class="mt-2">
            <p class="flex items-center text-gray-700">
              🚇 Metro: East Nanjing Road (230m)
            </p>
            <p class="flex items-center text-gray-700">
              🚇 Metro: Tiantong Road (980m)
            </p>
          </div>
          <a href="#" class="text-blue-600 font-medium mt-2 inline-block"
            >View on Map</a
          >
        </div>
      </div>

      <div class="">
        <h1 class="font-semibold pt-5 pl-7 mb-4">Amenities</h1>
        <div
          class="grid grid-cols-5 gap-3 pl-7 font-normal text-gray-600 text-base"
        >
          <div class="space-y-2">
            <h5>Luggage storage</h5>
            <h5>Public parking</h5>
          </div>
          <div class="space-y-2">
            <h5>Restaurant</h5>
            <h5>Wi-Fi in public areas</h5>
          </div>
          <div class="space-y-2">
            <h5>Meeting room</h5>
            <h5>24-hour front desk</h5>
          </div>
        </div>
      </div>

      <div>
        <h1 class="font-semibold p-3 pl-7 text-medium">Property Description</h1>
        <p class="w-3xl font-normal line-clamp-3  text-gray-600 text-base pl-7">
          {{ hotels.description }}
        </p>
      </div>
    </div>

    <div class="" v-for="(room , index) in rooms.slice(0,2)" :key="room.id">
    
      
        <ListRoom>
         <template #roomName>
          {{ room.name }}
        </template>
        <template #descriptionRoomOffline>
          {{ room.options[0].description }}
        </template>

        <template #paymentOffline>
          {{  room.options[0].payment }}
        </template> 

        <template #descriptionRoomOnline>
          {{ room.options[1].description }}
        </template>
        
        <template #paymentOnline>
          {{  room.options[1].payment }}
        </template>

        <template #capacity>
          {{  room.capacity }}
        </template>

        <template #ReserveOption1>
          <button @click="activeReserve(room.id, hotels.id,room.options[0].id)">Reserve</button>
        </template> 

        <template #ReserveOption2>
          <button @click="activeReserve(room.id, hotels.id,room.options[1].id)">Reserve</button>
        </template>

        <template #priceOption1>
          {{ room.options[0].price }}
        </template>

        <template #priceOption2>
          {{ room.options[1].price }}
        </template>
      </ListRoom>
      
    </div>
  </div>
</template>
