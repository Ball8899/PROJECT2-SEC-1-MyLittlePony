<script setup>
import Navbar from "../Navbar.vue";

import { onMounted, ref } from "vue";
import Hotel from "../../../data/Hotels.json";
import { getBookingById, getHotelById, getHotels } from "./HotelfetchUtils";
import ListModelofHotel from "./ListModelofHotel.vue";
// const hotels = ref([]);

// onMounted(async () => {
//   try {
//     hotels.value = await getHotelById(
//       `${import.meta.env.VITE_APP_URL}/hotels`,
//       1
//     );
//   } catch (error) {
//     console.log(error);
//   }
//});
</script>

<template>
  <Navbar></Navbar>

  <div class="bg-gray-100 h-400 w-full rounded-t-3xl">
    <div
      class="bg-white rounded-lg absolute w-7xl max-w-7xl h-108 top-48 left-1/2 -translate-x-1/2 shadow-base"
    >
      <div>
        <h1 class="text-3xl font-semibold p-5 pb-3">Name</h1>
        <span class="font-normal text-gray-500 text-base p-5">
          <slot name="descriptionOFHeader">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
            delectus? Inventore q
          </slot>
        </span>

        <h1
          class="absolute text-2xl text-white font-semibold cursor-pointer hover:bg-blue-700 rounded-lg bg-blue-600 h-12 justify-center items-center flex inset-y-0 right-5 top-5 w-28"
        >
          ฿ price
        </h1>
      </div>

      <div class="flex">
        <slot name="MainPhotoOfHeader">
          <img
            src="https://picsum.photos/300/200"
            class="w-md h-78 ml-5 mt-3 m-2 rounded-sm"
          />
        </slot>
        <div class="mt-3 grid grid-cols-3 grid-rows-2 gap-2">
          <slot name="SubPhotoOfHeader">
            <img
              src="https://picsum.photos/300/200"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
              src="https://picsum.photos/300/200"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
              src="https://picsum.photos/300/200"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
              src="https://picsum.photos/300/200"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
              src="https://picsum.photos/300/200"
              class="w-64 ml-0 h-37 rounded-sm"
            />
            <img
              src="https://picsum.photos/300/200"
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
            >rating
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
        <p class="w-4xl font-normal text-gray-600 text-base pl-7">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum culpa
          eligendi molestias, laudantium voluptates laboriosam quidem ad totam,
          labore inventore provident impedit. Ullam enim nemo dolorem reicies
          delectus aspernatur! Non!
        </p>
      </div>
    </div>
    <div class="bg-white rounded-lg absolute h-100  w-320 left-20 top-296">
      <h1 class="text-xl p-4 font-semibold">
        Sea View Grand Deluxe King Room (Happy&Bliss building)
      </h1>
      <div class="grid px-3  gap-2">
        <img
          class="w-50 rounded-lg h-28"
          src="https://picsum.photos/300/200"
          alt=""
        />
        <div class="w-50 g gap-2 grid grid-cols-2">
          <img class="rounded-lg" src="https://picsum.photos/300/200" alt="" />
          <img class="rounded-lg" src="https://picsum.photos/300/200" alt="" />
        </div>
        <div class="">
          <ul class="text-gray-800">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide absolute lucide-bed-single"
              >
                <path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
                <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
                <path d="M3 18h18" />
              </svg>
              <p class="pl-8 font-semibold">1 queen bed</p>
            </li>

            <li class="pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide absolute lucide-cigarette-off"
              >
                <path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" />
                <path d="M18 8c0-2.5-2-2.5-2-5" />
                <path d="m2 2 20 20" />
                <path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" />
                <path d="M22 8c0-2.5-2-2.5-2-5" />
                <path d="M7 12v4" />
              </svg>
              <p class="pl-8 font-light font-gray-100">Non-smoking</p>
            </li>

            <li class="pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide absolute lucide-air-vent"
              >
                <path
                  d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                />
                <path d="M6 8h12" />
                <path
                  d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"
                />
                <path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />
              </svg>
              <p class="pl-8 font-light font-gray-100">Air conditioning</p>
            </li>

            <li class="pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide absolute lucide-wifi"
              >
                <path d="M12 20h.01" />
                <path d="M2 8.82a15 15 0 0 1 20 0" />
                <path d="M5 12.859a10 10 0 0 1 14 0" />
                <path d="M8.5 16.429a5 5 0 0 1 7 0" />
              </svg>
              <p class="pl-8 font-light font-gray-100">Free Wi-Fi</p>
            </li>
          </ul>

          <div class="absolute border-gray-200 w-255 h-80 top-15 border ml-58">
            <ul class="grid grid-cols-3">
              <li class="p-2 bg-gray-200">Your Choices</li>
              <li class="p-2 pl-24 bg-gray-200">Sleeps</li>
              <li class="p-2 bg-gray-200">Today's Price</li>
            </ul>
            <ul
              class="font-light pr-10 h-70 absolute border-gray-200 pt-5 border-r"
            >
              <li class="pl-3 pt-3">
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
                  class="lucide absolute lucide-utensils"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
                <p class="pl-8">Great breakfast for ฿ 185.79 (optional)</p>
              </li>

              <li class="pl-3 pt-3">
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
                  class="lucide absolute lucide-ticket-x"
                >
                  <path
                    d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                  />
                  <path d="m9.5 14.5 5-5" />
                  <path d="m9.5 9.5 5 5" />
                </svg>
                <p class="pl-8">Non-refundable</p>
              </li>

              <li class="pl-3 pt-3">
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
                  class="lucide absolute lucide-credit-card"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <p class="pl-8">Prepay online</p>
              </li>
            </ul>

            <ul class="font-light pr-23 left-100 h-70 absolute border-gray-200 pt-5 border-r">
              <li>
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
                  class="lucide ml-12 lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </li>
            </ul>

            <ul>
              <li   class="absolute text-2xl text-white font-semibold cursor-pointer 
              hover:bg-blue-700 rounded-lg bg-blue-600 h-12 justify-center items-center flex inset-y-0 right-28 top-38 w-30"
              >
              Reserve

              </li>
              <li class="absolute right-60 text-xl top-38">
                ฿ 800
              </li>
              <li class="absolute right-60 text-light top-44">
                Price Detail
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
