<script setup>
import { ref, defineProps, defineEmits } from "vue";
import Booking from "./Booking.vue";
import Advert from "./Advert.vue";
const typeBooking = ref('flight')

const emits = defineEmits(["update"]);

const toggle = defineProps({
  showToggle: {
    type: Boolean,
  },
});

const updateEmits = () => {
  emits("update");
};
</script>

<template>
  <div class="w-[100%] p-8">
    <div class="bg-blue-500 rounded-3xl">
      <div
        class="bg-[url(../assets/image/bg-light.png)] bg-[100%_70%] text-white rounded-3xl pb-10"
      >
        <h1 class="pt-15 pb-4 text-4xl font-semibold tracking-wide text-center">
          Your Trip Your Happiness
        </h1>
        <div
          class="flex flex-row justify-center items-center text-base gap-5 tracking-wide"
        >
          <p>🏖 Your tirp start here</p>
          <p>|</p>
          <p>🏕 Custom your trip now!</p>
        </div>
        <div class="flex justify-center py-10 ">
          <div
            class="relative z-100 flex flex-row backdrop-blur-xl justify-between bg-black/50 w-[80%] rounded-full px-1 py-1"
          >
              <button
                @click="typeBooking = 'hotel'"
                :class="typeBooking === 'hotel' ? 'text-black bg-white rounded-full' : '' "
                class="flex flex-row px-5 py-1 justify-center items-center gap-2"
              >
                <i class="text-lg fa-solid fa-bed"></i>
                <p class="text-sm tracking-wide font-semibold">
                  Hotel & Homes
                </p>
              </button>
              <button
                @click="typeBooking = 'flight'"
                :class="typeBooking === 'flight' ? 'text-black bg-white rounded-full' : '' "
                class="flex flex-row px-5 py-1 justify-center items-center gap-2"
              >
                <i class="fa-solid fa-plane-departure"></i>
                <p class="text-sm tracking-wide font-semibold">Flights</p>
              </button>
              <button
               @click="typeBooking = 'train'"
               :class="typeBooking === 'train' ? 'text-black bg-white rounded-full' : '' "
                class="flex flex-row px-4 justify-center items-center gap-2 py-1"
              >
                <i class="text-lg fa-solid fa-bed"></i>
                <p class="text-sm tracking-wide font-semibold">Trains</p>
              </button>
              <button
               @click="typeBooking = 'car'"
               :class="typeBooking === 'car' ? 'text-black bg-white rounded-full' : '' "
                class="flex flex-row px-5 py-1 justify-center items-center gap-2"
              >
                <i class="fa-solid fa-car"></i>
                <p class="text-sm tracking-wide font-semibold">Cars</p>
              </button>
              <button
               @click="typeBooking = 'tour'"
               :class="typeBooking === 'tour' ? 'text-black bg-white rounded-full' : '' "
                class="flex flex-row px-5 py-1 justify-center items-center gap-2"
              >
                <i class="w-5 text-lg fa-solid fa-passport" ></i>
                <p class="text-sm tracking-wide font-semibold">
                  Attractions & Tours
                </p>
              </button>
              <button
                @click="typeBooking = 'flight-and-hotel'"
               :class="typeBooking === 'flight-and-hotel' ? 'text-black bg-white rounded-full' : '' "
                class="flex flex-row px-5 py-1 justify-center items-center gap-2"
              >
                <i class="fa-solid fa-briefcase"></i>
                <p class="text-sm tracking-wide font-semibold">
                  Flight + Hotel
                </p>
              </button>
          </div>
        </div>
        <div class="relative z-10 w-[90%] m-auto -mt-14 rounded-xl" >
          <Booking @update="updateEmits" :show-toggle="toggle.showToggle" />
        </div>
      </div>
    </div>
    <Advert class="relative z-0"></Advert>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
