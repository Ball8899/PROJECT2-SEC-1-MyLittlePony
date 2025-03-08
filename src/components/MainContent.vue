<script setup>
import { ref } from 'vue'
import Booking from './Booking.vue'
const showBooking = ref(true)


const toggleBooking = () => {
    showBooking.value = !showBooking.value
}
</script>

<template>
    <div class="w-[90%] p-10">
        <div class="bg-blue-500 rounded-3xl">
            <div class="bg-[url(../assets/image/bg-light.png)] bg-[100%_70%] text-white rounded-3xl pb-10">
                <h1 class=" pt-20 pb-8 text-5xl font-semibold tracking-wide text-center">Your Trip Your Happiness</h1>
                <div class="flex flex-row justify-center items-center text-lg gap-5 tracking-wide">
                    <p>🏖 Your tirp start here</p>
                    <p>|</p>
                    <p>🏕 Custom your trip now!</p>
                </div>
                <div class="flex justify-center py-15">
                    <div class="flex flex-row  backdrop-blur-lg justify-between bg-black/70 w-[60%] rounded-full px-10">
                        <button class="py-4 flex flex-col">
                            <i class="text-xl fa-solid fa-bed"></i>
                            <p class="mt-1">Hotel & Homes</p>
                        </button>
                        <button @click="toggleBooking" class=" py-4 flex flex-col">
                            <i class=" text-xl fa-solid fa-plane-departure"></i>
                            <p class="mt-1">Flights</p>
                        </button>
                        <button class=" py-4  flex flex-col">
                            <i class="text-xl fa-solid fa-train"></i>
                            <p class="mt-1">Trains</p>
                        </button>
                        <button class=" py-4  flex flex-col">
                            <i class="text-xl fa-solid fa-car"></i>
                            <p class="mt-1">Cars</p>
                        </button>
                        <button class=" py-4 flex flex-col">
                            <i class="text-xl fa-solid fa-passport"></i>
                            <p class="mt-1">Attractions & Tours</p>
                        </button>
                        <button class="py-4 flex flex-col">
                            <i class="text-xl fa-solid fa-place-of-worship"></i>
                            <p class="mt-1">Flight + Hotel</p>
                        </button>
                    </div>
                </div>
                <Booking class=" w-[90%] m-auto -mt-25 rounded-xl" v-if="showBooking" />
            </div>

        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
