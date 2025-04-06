<script setup>
let modalTimeout = null;
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { Teleport } from "vue";
import { defineProps } from "vue";
import { getHotelById, createBooking } from "../utils/fetchUtil";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const date = new Date();
const route = useRoute();
const router = useRouter();

defineProps(["closeModal"]);

const hotels = ref({});
const fName = ref("");
const lName = ref("");
const email = ref("");
const phoneNumber = ref("");
const roomId = route.params.roomId;
const hotelId = route.params.hotelId;
const optionId = route.params.optionId;
const rooms = ref([]);
const fromSubmit = ref(false);
const selectedRoom = ref(null);
const selectedOption = ref(null);
const selectedNight = ref(false);
const selectRoomValue = ref(false);
const numberNight = ref(1);
const numberRoom = ref(1);
const checkInTime = ref("");
const errorMessage = ref("Please Enter Again");
const bookingSuccess = ref(false);

onMounted(async () => {
  try {
    if (!hotelId || !roomId || !optionId) {
      console.log("not found room ID or not found Hotel ID");
      return;
    }
    hotels.value = await getHotelById(
      `${import.meta.env.VITE_APP_URL}/hotels`,
      hotelId
    );
    if (hotels.value && hotels.value.rooms) {
      rooms.value = hotels.value.rooms;
      newBookingHotel.hotelName = hotels.value.name;
    }
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
});

watchEffect(() => {
  if (hotels.value && hotels.value.name) {
    newBookingHotel.hotelName = hotels.value.name;
  }
});

watchEffect(() => {
  if (rooms.value && rooms.value.length > 0) {
    selectedRoom.value = rooms.value.find(
      (room) => room.id === parseInt(roomId)
    );
  } else {
    selectedRoom.value = "";
  }
});

watchEffect(() => {
  if (selectedRoom.value && selectedRoom.value.options) {
    selectedOption.value = selectedRoom.value.options.find(
      (option) => option.id === parseInt(optionId)
    );
  }
});

const minDate = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { day, month, year };
});

const toggleSelectNight = () => {
  selectedNight.value = !selectedNight.value;
  selectRoomValue.value = false;
};
const closeToggleSelectNight = () => {
  selectedNight.value = false;
  selectRoomValue.value = false;
};

const toggleSelectRoom = () => {
  selectRoomValue.value = !selectRoomValue.value;
  selectedNight.value = false;
};

const totalPrice = computed(() => {
  const pricePerNight = 400;
  const pricePerRoom = 600;
  const optionPrice = selectedOption.value ? selectedOption.value.price : 0;

  return (
    numberNight.value * pricePerNight +
    numberRoom.value * pricePerRoom +
    optionPrice
  );
});

const calculateCheckIn = computed(() => {
  if (!checkInTime.value) return null;
  const date = new Date(checkInTime.value);
  date.setHours(16, 0, 0, 0);
  return date;
});

const calculateCheckOut = computed(() => {
  if (!checkInTime.value) return null;
  const checkInDate = new Date(checkInTime.value);
  checkInDate.setDate(checkInDate.getDate() + numberNight.value);
  checkInDate.setHours(15, 0, 0, 0);
  return checkInDate;
});

const increaseOrDecreaseNight = (value) => {
  if (value === "increase") {
    numberNight.value++;
  } else if (value === "decrease" && numberNight.value > 1) {
    numberNight.value--;
  }
};

const increaseOrDecreaseRoom = (value) => {
  if (value === "increase") {
    numberRoom.value++;
  } else if (value === "decrease" && numberRoom.value > 1) {
    numberRoom.value--;
  }
};

const newBookingHotel = reactive({
  fName: "",
  lName: "",
  email: "",
  phoneNumber: "",
  hotelId: hotelId,
  roomId: roomId,
  hotelName: hotels.value.name,
  price: totalPrice.value,
  dateBooking: date.toLocaleString("th-TH"),
  timeBooking:"",
  roomAmount: 1,
  nightAmount: 1,
  checkInTime: "",
  checkInDate:"",
  checkOutTime: "",
  checkOutDate: "",
  approve: "waiting",
});

watchEffect(() => {
  newBookingHotel.roomAmount = numberRoom.value;
  newBookingHotel.nightAmount = numberNight.value;
  newBookingHotel.price = totalPrice.value;

  if (calculateCheckIn.value) {
    newBookingHotel.checkOutTime = formatTime(calculateCheckOut.value);
    newBookingHotel.checkOutDate = formatDate(calculateCheckOut.value)

    newBookingHotel.checkInTime = formatTime(calculateCheckIn.value);
    newBookingHotel.checkInDate = formatDate(calculateCheckIn.value);
    
  } else {
    newBookingHotel.checkInTime = "";
    newBookingHotel.checkOutTime = "";
  }
});

const formatTime = (times) => {
  const dates = new Date(times)
  const hours = dates.getHours();  
  const minutes = dates.getMinutes(); 
 return `${hours}:${minutes}0`

}

const formatDate = (times) => {
  const dates = new Date(times).toDateString()
 return dates

}


console.log(formatTime.value)

const submitBooking = async () => {
  if (!validFrom()) {
    fromSubmit.value = true;
    return false;
  }
  bookingSuccess.value = true;

  newBookingHotel.fName = fName.value;
  newBookingHotel.lName = lName.value;
  newBookingHotel.email = email.value;
  newBookingHotel.phoneNumber = phoneNumber.value;
  newBookingHotel.price = totalPrice.value;

  modalTimeout = setTimeout(async () => {
    try {
      await addBooking();
    } catch (error) {
      console.error("Booking is not correct", error);
    }
  }, 300000);
};

const closeModal = async () => {
  if (!validFrom()) {
    fromSubmit.value = true;
    return false;
  }
  if (modalTimeout) {
    clearTimeout(modalTimeout);
    modalTimeout = null;
  }
  if (validFrom()) {
    try {
      await addBooking();
    } catch (error) {
      console.error("Booking is not correct", error);
    }
  }
  bookingSuccess.value = false;
};

const routerToListContent = () => {
  closeModal();
  router.push({ name: "flightBookedContent" });
};

const addBooking = async () => {
  if (!calculateCheckIn.value || isNaN(calculateCheckIn.value.getTime())) {
    return false;
  }
  try {
    await createBooking(
      `${import.meta.env.VITE_APP_URL}/bookingHotel`,
      newBookingHotel
    );
    return true;
  } catch (err) {
    console.log("not Create");
    return false;
  }
};

const validFrom = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;
  const namePattern = /^[A-Za-zก-๙\s'-]+$/;
  const datePattern = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;

  const checkFname =
    fName.value.trim().length > 0 && namePattern.test(fName.value);
  const checkLname =
    lName.value.trim().length > 0 && namePattern.test(lName.value);
  const checkEmail = emailPattern.test(email.value);
  const checkPhoneNumber = phonePattern.test(phoneNumber.value);

  let checkDate = true;
  if (checkInTime.value) {
    if (typeof checkInTime.value === "string") {
      checkDate = datePattern.test(checkInTime.value.trim());
    }
  }

  if (
    checkFname === "" ||
    checkLname === "" ||
    checkEmail === "" ||
    checkPhoneNumber === ""
  ) {
    return false;
  }

  if (!checkFname || !checkLname || !checkEmail || !checkPhoneNumber) {
    return false;
  }

  if (!checkFname || !checkLname) {
    return false;
  }

  if (!checkEmail) {
    return false;
  }

  if (!checkPhoneNumber) {
    return false;
  }

  if (!checkInTime.value) {
    return false;
  }

  if (!calculateCheckIn.value) {
    return false;
  }

  if (!checkDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (calculateCheckIn.value < today) {
    return false;
  }

  return true;
};
</script>
<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div
        @click="closeToggleSelectNight"
        class="bg-white rounded-lg shadow-sm p-4 mb-6"
      >
        <div class="flex items-center text-green-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="font-medium">You've saved a total of ฿ 137.57!</span>
        </div>
        <div class="flex items-center text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Only 3 rooms left!</span>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <div @click="closeToggleSelectNight" class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">
                Guest Info
              </h2>
              <p class="text-gray-600 mb-6">
                Guest names must match the valid ID which will be used at
                check-in.
              </p>

              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      First name <span class="text-red-500">*</span>
                      <span v-if="fromSubmit" class="ml-3 text-red-500">{{
                        errorMessage
                      }}</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Please only use English letters"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      v-model="fName"
                      required
                      :class="{ 'border-red-500': fromSubmit, '': !fromSubmit }"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Last name <span class="text-red-500">*</span>
                      <span v-if="fromSubmit" class="ml-3 text-red-500">{{
                        errorMessage
                      }}</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Please only use English letters"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      v-model="lName"
                      required
                      :class="{ 'border-red-500': fromSubmit, '': !fromSubmit }"
                    />
                  </div>
                </div>

                <div @click="closeToggleSelectNight">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Email <span class="text-red-500">*</span>
                    <span v-if="fromSubmit" class="ml-3 text-red-500">{{
                      errorMessage
                    }}</span>
                  </label>
                  <input
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                    v-model="email"
                    :class="{ 'border-red-500': fromSubmit, '': !fromSubmit }"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Booking confirmation will be sent to this email
                  </p>
                </div>

                <div @click="closeToggleSelectNight" class="flex gap-5">
                  <div class="grid">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Check In Date <span class="text-red-500">*</span>
                      <span v-if="fromSubmit" class="ml-3 text-red-500">{{
                        errorMessage
                      }}</span>
                    </label>

                    <input
                      type="text"
                      v-model="checkInTime"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      :placeholder="`${minDate.year}/${minDate.month}/${minDate.day}`"
                      :class="{ 'border-red-500': fromSubmit, '': !fromSubmit }"
                    />
                  </div>
                </div>

                <div @click="closeToggleSelectNight">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Phone number <span class="text-red-500">*</span>
                    <span v-if="fromSubmit" class="ml-3 text-red-500">{{
                      errorMessage
                    }}</span>
                  </label>
                  <div class="flex">
                    <div class="relative w-24">
                      <div
                        class="flex items-center px-4 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                      >
                        <span>(+66)</span>
                        <svg
                          class="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      class="w-full px-4 py-2 border border-gray-300 border-l-0 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                      v-model="phoneNumber"
                      :class="{ 'border-red-500': fromSubmit, '': !fromSubmit }"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            @click="closeToggleSelectNight"
            class="bg-white rounded-lg shadow-sm mb-6"
          >
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">
                  Special Requests
                  <span class="text-gray-500 text-sm font-normal"
                    >(Optional)</span
                  >
                </h2>
              </div>
              <p class="text-gray-600 mb-4">
                The property will do its best, but cannot guarantee to fulfill
                all requests.
              </p>
              <input
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Please enter your request here (optional)"
              />
            </div>
          </div>

          <div
            @click="closeToggleSelectNight"
            class="bg-white rounded-lg shadow-sm mb-6"
          >
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">
                Available for This Booking
              </h2>
            </div>
          </div>

          <button
            type="submit"
            @click="submitBooking"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition font-medium text-lg"
          >
            Complete Booking
          </button>
        </div>

        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-sm">
            <div v-if="hotels" class="p-4">
              <div
                @click="closeToggleSelectNight"
                v-if="selectedRoom"
                class="flex gap-4 mb-4"
              >
                <img
                  src="../assets/hotels/room1.jpg"
                  alt="Hotel exterior"
                  class="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h1 class="text-lg font-bold text-navy-900">
                    {{ selectedRoom.name }}
                  </h1>
                  <div class="flex items-center mb-1">
                    <span class="text-yellow-400">★★★★</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div
                      class="bg-blue-600 text-white px-2 py-0.5 rounded-md text-sm font-medium"
                    >
                      {{ hotels.rating }} /5
                    </div>
                    <span class="text-sm font-medium text-gray-700">Good</span>
                    <span class="text-sm text-gray-500">3,554 reviews</span>
                  </div>
                </div>
              </div>

              <div v-if="selectedOption">
                <div
                  @click="closeToggleSelectNight"
                  class="border-t border-gray-200 pt-4 mb-4"
                >
                  <h3 class="font-bold text-navy-900 mb-2">
                    Lisheng Selected Standard Double Bed Room
                  </h3>
                  <div
                    class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-2"
                  >
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      x2 · 1 queen bed
                    </div>
                    <div class="flex items-center text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                        />
                      </svg>
                      Free Wi-Fi
                    </div>
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      Non-smoking
                    </div>
                    <div class="flex items-center text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      City view
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-2">
                    25m² · Floor: 9-18
                  </div>
                  <div class="flex items-center text-blue-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    30-minute Cancellation Window
                  </div>
                </div>

                <div class="border-t border-gray-200 py-4">
                  <div class="flex justify-between mb-2">
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {{ numberNight }} night
                    </div>
                    <div
                      class="flex items-center absolute text-black right-29 mt-4 h-15 justify-between w-45 pl-2 p-5 pt-0 bg-white rounded-lg shadow-sm transition-colors"
                      v-if="selectedNight"
                    >
                      <button
                        @click="increaseOrDecreaseNight('decrease')"
                        class="absolute left-14 font-semibold px-1 text-blue-600 rounded-md cursor-pointer shadow-lg"
                      >
                        -
                      </button>
                      <p class="font-semibold">
                        night
                        <input
                          class="w-18 pl-6 ml-8 text-blue-600 rounded-lg absolute"
                          v-model="numberNight"
                        />
                      </p>

                      <button
                        @click="increaseOrDecreaseNight('increase')"
                        class="absolute right-4 font-semibold px-1 text-blue-600 rounded-md cursor-pointer 0 shadow-lg"
                      >
                        +
                      </button>
                    </div>

                    <svg
                      @click="toggleSelectNight"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-600 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {{ numberRoom }} room
                    </div>
                    <div
                      class="flex items-center absolute text-black right-29 mt-4 h-15 justify-between w-45 pl-2 p-5 pt-0 bg-white rounded-lg shadow-sm transition-colors"
                      v-if="selectRoomValue"
                    >
                      <button
                        @click="increaseOrDecreaseRoom('decrease')"
                        class="absolute left-14 font-semibold px-1 text-blue-600 rounded-md cursor-pointer shadow-lg"
                      >
                        -
                      </button>
                      <p class="font-semibold">
                        room
                        <input
                          class="w-18 pl-6 ml-8 text-blue-600 rounded-lg absolute"
                          v-model="numberRoom"
                        />
                      </p>

                      <button
                        @click="increaseOrDecreaseRoom('increase')"
                        increase
                        class="absolute right-4 font-semibold px-1 text-blue-600 rounded-md cursor-pointer 0 shadow-lg"
                      >
                        +
                      </button>
                    </div>
                    <svg
                      @click="toggleSelectRoom"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-600 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  @click="closeToggleSelectNight"
                  class="border-t border-gray-200 py-4"
                >
                  <h3 class="text-lg font-bold text-navy-900 mb-4">
                    Price Details
                  </h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600">1 room × 1 night</span>
                      <span class="font-medium">฿ {{ totalPrice }}</span>
                    </div>

                    <div class="pl-4 border-l-2 border-gray-200">
                      <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Service charge</span>
                        <span>฿ 2000</span>
                      </div>
                    </div>
                    <div class="flex justify-between text-green-600">
                      <span class="font-medium">Special Discount</span>
                      <span class="font-medium">-฿ 137.57</span>
                    </div>
                  </div>

                  <div class="mt-6 pt-4 border-t border-gray-200">
                    <div class="flex justify-between items-center">
                      <span class="text-lg font-bold text-navy-900"
                        >Paymnet</span
                      >
                      <span class="text-2xl font-bold text-navy-900"
                        >฿ {{ totalPrice }}</span
                      >
                    </div>
                    <div
                      class="flex items-center justify-end gap-2 mt-2 text-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="bookingSuccess"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center"
      >
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
        >
          <svg
            class="h-6 w-6 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Booked Successful
        </h3>
        <p class="text-sm text-gray-600 mb-4">Thank you !</p>

        <div class="flex gap-5">
          <button
            @click="closeModal"
            class="w-1/2 bg-red-600 text-white py-2 px-3 hover:bg-red-700 rounded-md transition font-medium"
          >
            Close
          </button>

          <button
            class="w-1/2 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition font-medium"
            @click="routerToListContent"
          >
            Your Booked
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
