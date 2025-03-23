<script setup></script>

<template>
  <div class="bg-white rounded-lg mb-7 h-108 left-20 w-320 relative top-276">
    <div class="absolute">
      <h1 class="text-xl p-4 font-semibold">
        <slot name="roomName">
          Sea View Grand Deluxe King Room (Happy&Bliss building)
        </slot>
      </h1>
      <div class="grid px-3 gap-2">
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

          <div class="absolute border-gray-200 w-255 h-88 top-15 border ml-58">
            <ul class="grid grid-cols-3">
              <li class="p-2 bg-gray-200">Your Choices</li>
              <li class="p-2 pl-24 bg-gray-200">Sleeps</li>
              <li class="p-2 bg-gray-200">Today's Price</li>
            </ul>
            <ul
              class="font-light pr-10 h-75 absolute border-gray-200 pt-1 border-r"
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

              <li
                class="pl-3 pt-3 border-b text-blue-600 border-gray-200 absolute w-255 pb-11"
              >
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
                <p class="pl-8">
                  <slot name="paymentOnline"> online </slot>
                </p>
              </li>
              <li class="pl-11 pt-11 absolute">
                <slot name="descriptionRoomOffline">
                  Book
                </slot>
              </li>
            </ul>

          

            <ul
              class="font-light pr-15 left-100 h-75 absolute border-gray-200 pt-5 border-r"
            >
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
                  class="lucide absolute  lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </li>
              <p  class=" top-5 ml-7 font-light">
                <slot name="capacity">
                  4 
                </slot>
                persons
              </p>
            </ul>


            <ul
              class="font-light top-50 pr-23 left-100  absolute  pt-5 "
            >
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
                  class="lucide  lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </li>
              <p  class="absolute top-5 ml-7 font-light">
                <slot name="capacity">
                  4 
                </slot>
                persons
              </p>
            </ul>

            

            <ul class="pt-20 font-light">
              <li class="pt-23 pl-11 left-11">
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
                  class="lucide absolute left-3 lucide-utensils"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
                <p class="">Great breakfast for ฿ 185.79 (optional)</p>
              </li>
              <li class="py-2 pl-11 pt-3 left-11">
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
                  class="lucide left-3 absolute lucide-ticket-x"
                >
                  <path
                    d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
                  />
                  <path d="m9.5 14.5 5-5" />
                  <path d="m9.5 9.5 5 5" />
                </svg>
                <p class="">Non-refundable</p>
              </li>

              <li class="pl-11 pb-2 pt-1 left-11 text-blue-600">
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
                  class="lucide absolute left-3 lucide-credit-card"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <p>
                  <slot name="paymentOffline"> offline </slot>
                </p>
              </li>

              <li class="pl-11">
                <slot name="descriptionRoomOnline">
                  Book at hotel reception or via phone
                </slot>
              </li>

            </ul>
            

           
            

            <ul>
              <li
                class="absolute text-2xl text-white font-semibold cursor-pointer hover:bg-blue-700 rounded-lg bg-blue-600 h-12 justify-center items-center flex inset-y-0 right-28 top-25 w-30"
              >
                <slot name="ReserveOption1"> Reserve </slot>
              </li>
              <li class="absolute right-60 text-xl top-25">
                ฿<slot name="priceOption1"> 800</slot>
              </li>
              <li class="absolute right-60 text-light top-31">Price Detail</li>

              <li
                class="absolute text-2xl text-white font-semibold cursor-pointer hover:bg-blue-700 rounded-lg bg-blue-600 h-12 justify-center items-center flex inset-y-0 right-28 top-55 w-30"
              >
                <slot name="ReserveOption2"> Reserve </slot>
              </li>
              <li class="absolute right-60 text-xl top-54">
                ฿<slot name="priceOption2"> 800</slot>
              </li>
              <li class="absolute right-60 text-light top-60">Price Detail</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

