<script setup>
import { onMounted, reactive, ref } from "vue";
import Navbar from "../Navbar.vue";
import {
  getHotels,
  getHotelById,
  createBooking,
} from "./HotelfetchUtils";
import listModel from "../listModel.vue";
const hotel = ref([]);

const fName = ref("")
const lName = ref("")
const email = ref("")
const phoneNumber = ref("")


const newBookingHotel= reactive({
    "hotelId": 5,
    "guestName": `${fName.value}  ${lName.value}`,
    "email": email,
    "phoneNumber": phoneNumber,
    "checkIn": "2023-12-20",
    "checkOut": "2023-12-25",
    "guests": 2,
    "totalPrice": 10500

})

onMounted(async () => {
  try {
    hotel.value = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
});

const addBooking = async () => {
  try{
     await createBooking(`${import.meta.env.VITE_APP_URL}/bookings`,newBookingHotel)
} catch (err) {
    console.error('Error fetching hotels:', err);
};
}

</script>

<template>
  <Navbar/>
  <div class="bg-gray-100 min-h-screen py-8 px-4 md:px-0">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mr-28 mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Complete Your Booking</h1>
        <p class="text-lg text-gray-600 mt-2">
          Just a few more steps to secure your stay
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="bg-green-50 p-4 border-b border-green-100">
              <div class="text-center">
                <h2 class="text-xl font-bold text-green-700">
                  You've saved a total of ฿8,109.25!
                </h2>
                <p class="text-green-600">
                  This property's best price is yours
                </p>
              </div>
            </div>

            <form @submit.prevent="addBooking" class="p-6 space-y-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">
                Guest Information
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                
                    >First name *</label
                  >
                  <input
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    v-model="fName"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Last name *</label
                  >
                  <input
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    v-model="lName"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Email *</label
                >
                <input
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  v-model="email"
                />
                <p class="text-sm text-gray-500 mt-1">
                  Booking confirmation will be sent to this email
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Phone number *</label
                >
                <input
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  v-model="phoneNumber"
                />
              </div>

              <div class="bg-blue-50 p-4 rounded-lg">
                <p class="text-blue-800 font-medium">
                  Register with your email and earn 21 Trip Coins (≈ ฿7.07)
                  after check out.
                </p>

                <div class="mt-4 space-y-3">
                  <label class="block text-sm font-medium text-gray-700"
                    >Account Options</label
                  >

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="manage-booking"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      for="manage-booking"
                      class="ml-2 text-sm text-gray-700"
                      >Easily manage booking</label
                    >
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="rewards"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked
                    />
                    <label for="rewards" class="ml-2 text-sm text-gray-700"
                      >Rewards for booking</label
                    >
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="set-password"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="set-password" class="ml-2 text-sm text-gray-700"
                      >Set your password to register</label
                    >
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests
                  <span class="text-gray-500 font-normal">(Optional)</span>
                </label>
                <p class="text-sm text-gray-500 mb-2">
                  The property will do its best, but cannot guarantee to fulfill
                  all requests.
                </p>
                <textarea
                  placeholder="Please enter your request (Optional)"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder:text-gray-400 placeholder:italic"
                  rows="3"
                ></textarea>
              </div>

              <div class="text-sm text-gray-600">
                <p>
                  By proceeding, I acknowledge that I have read and agree to
                  Trip.com's
                  <a href="#" class="text-blue-600 hover:underline"
                    >Terms and Conditions</a
                  >
                  and
                  <a href="#" class="text-blue-600 hover:underline"
                    >Privacy Statement</a
                  >.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition font-medium text-lg"
                  
                >
                  Complete Booking
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- <listModel :items="hotel">
        <template #hotelList="{ Item }> -->
          <div class="max-w-2xl px-4 bg-white rounded-lg shadow-sm p-6">
            <!-- Hotel Header Section -->
            <div class="flex gap-6 mb-8">
              <img
                src="https://picsum.photos/300/200"
                alt="Hotel exterior"
                class="w-48 h-32 object-cover rounded-lg"
              />
              <div>
                <h1 class="text-2xl font-bold text-navy-900 mb-2">
                  B Your Home Hotel
                </h1>
                <h2 class="text-xl text-navy-800 mb-2">
                  Donmueang Airport Bangkok ★★★★
                </h2>
                <div class="flex items-center gap-3">
                  <div
                    class="bg-blue-600 text-white px-3 py-1 rounded-md font-medium"
                  >
                    4.1/5
                  </div>
                  <span class="font-medium text-gray-700">Very Good</span>
                  <span class="text-gray-500">2,567 reviews</span>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6">
              <h3 class="text-xl font-bold text-navy-900 mb-4">
                Standard Room
              </h3>
              <div class="space-y-2 text-gray-600">
                <div class="flex items-center gap-2">
                  <span>👥 x2</span>
                  <span>•</span>
                  <span>1 king bed or 2 single beds</span>
                  <span>•</span>
                  <span class="text-blue-600">Free Wi-Fi</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>Non-smoking</span>
                  <span>•</span>
                  <span>15-22m²</span>
                  <span>•</span>
                  <span>Floor: 2</span>
                </div>
                <div class="text-blue-600 flex items-center gap-2 mt-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Free Cancellation before 23:59, Mar 18</span>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 py-6">
              <div class="grid grid-cols-2 gap-8">
                <div>
                  <div class="text-gray-600 mb-1">Check-in</div>
                  <div class="font-medium">Fri, Mar 21</div>
                  <div class="text-sm text-gray-500">14:00-02:00</div>
                </div>
                <div>
                  <div class="text-gray-600 mb-1">Check-out</div>
                  <div class="font-medium">Sat, Mar 22</div>
                  <div class="text-sm text-gray-500">Before 12:00</div>
                </div>
              </div>
              <div class="flex gap-8 mt-4">
                <button
                  class="flex items-center gap-2 text-navy-900 font-medium"
                >
                  <span>1 night</span>
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  class="flex items-center gap-2 text-navy-900 font-medium"
                >
                  <span>1 room</span>
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Price Details Section -->
            <div class="border-t border-gray-200 py-6">
              <h3 class="text-xl font-bold text-navy-900 mb-4">
                Price Details
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">1 room × 1 night</span>
                  <span class="font-medium">฿ 1,677.58</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Service charge</span>
                  <span class="font-medium">฿ 66.90</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">VAT</span>
                  <span class="font-medium">฿ 43.76</span>
                </div>
                <div class="flex justify-between text-green-600">
                  <span class="font-medium">Limited Time Offer</span>
                  <span class="font-medium">-฿ 947.77</span>
                </div>
                <div class="flex justify-between text-green-600">
                  <span class="font-medium">Special Discount</span>
                  <span class="font-medium">-฿ 104.60</span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-navy-900"
                    >Prepay Online</span
                  >
                  <span class="text-2xl font-bold text-navy-900">฿ 735.87</span>
                </div>
                <div
                  class="flex items-center justify-end gap-2 mt-2 text-blue-600"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>We Price Match</span>
                </div>
              </div>
            </div>
          </div>

        
        <!-- </template>
      </listModel> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
          .text-navy-900 {
            color: #1a237e;
          }

          .text-navy-800 {
            color: #283593;
          }
</style>