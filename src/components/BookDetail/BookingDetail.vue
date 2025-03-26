<script setup>
import PaymentStatus from './PaymentStatus.vue';
import Likely from "./Likely.vue";
import TotalAmount from "./TotalAmount.vue";
import Navbar from '../Navbar.vue';
import FlightDetails from './FlightDetails.vue';
import PromoCode from './PromoCode.vue';
import { ref, computed, onMounted, onUnmounted } from "vue";


const flightData = ref(null);

const fetchFlightData = async () => {
    try {
        const response = await fetch("/data/flightData.json");
        if (!response.ok) throw new Error("Failed to fetch flight data");
        flightData.value = await response.json();
    } catch (error) {
        console.error("Error fetching flight data:", error);
    }
};

onMounted(() => {
    fetchFlightData();
});


const status = ref('awaiting');
const countdown = ref(Math.floor(2 * 60));


const timer = ref(null);
const startCountdown = () => {
    if (countdown.value <= 0) {
        status.value = "canceled";
        return;
    }
    timer.value = setTimeout(() => {
        countdown.value--;
        startCountdown();
    }, 1000);
};

const formattedTime = computed(() => {
    const minutes = Math.floor(countdown.value / 60);
    const seconds = countdown.value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

onMounted(startCountdown);
onUnmounted(() => clearTimeout(timer.value));


const cancelBooking = () => {
    clearTimeout(timer.value);
    status.value = "canceled";
};


</script>

<template>
    <div>
        <Navbar />
    </div>



    <div class="bg-gray-200 min-h-screen p-2 sm:p-4">
        <div class="text-xs sm:text-sm text-gray-700 flex flex-wrap space-x-2 mx-4 sm:ml-24 mb-4">
            <a href="" class="text-blue-600 hover:underline">All Bookings</a>
            <span> > </span>
            <a href="" class="text-blue-600 hover:underline">Flight Bookings</a>
            <span> > </span>
            <span class="text-gray-900">Booking Details</span>
        </div>


        <PaymentStatus v-if="status === 'awaiting'" :status="status"
            reason="Please complete payment before 22:00, March 12, 2025" bookingNo="1622918183214445">
            <template #action>
                <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-2 sm:mt-0">
                    <button v-if="countdown > 0"
                        class="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md w-full sm:w-auto text-sm">
                        Pay {{ formattedTime }}
                    </button>
                    <button v-else
                        class="bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md w-full sm:w-auto text-sm">
                        Payment Expired
                    </button>
                    <button @click="cancelBooking"
                        class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-blue-100 w-full sm:w-auto text-sm">
                        Cancel
                    </button>
                </div>
            </template>
        </PaymentStatus>

        <PaymentStatus v-else :status="status" bookingNo="77777777235" pin="405">
            <template #action>
                <button
                    class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-blue-100 text-sm w-full sm:w-auto mt-2 sm:mt-0">
                    Book Again
                </button>
            </template>
        </PaymentStatus>




        <TotalAmount :totalAmount="3500" bookingTime="17:26, March 8, 2025" />


        <Likely />

        <FlightDetails v-if="flightData" :flight="flightData">
        </FlightDetails>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl sm:text-xl font-bold">Your Add-ons</h2>
            <PromoCode :promoCodes="[
                { id: 1, icon: 'fa-solid fa-plane', description: '฿500 Off Airline Tickets', discount: 500 },
                { id: 2, icon: 'fa-solid fa-plane', description: '฿350 Off Airline Tickets', discount: 350 }
            ]">
            </PromoCode>
        </div>


        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl font-bold">Passenger Information</h2>
            <p class="text-gray-600 text-sm mt-1">
                Passport or ID information is not required at the time of booking.
                However, please ensure that you have a passport or ID valid for travel
                when you check in.
            </p>

            <div class="mt-6">
                <div class="text-base font-bold">
                    <span>1: GHGGG (First name)</span>
                    <span class="ml-2"><strong>SADSADSSAD</strong> (Last name)</span>
                </div>
                <table class="mt-4">
                    <tr>
                        <td class="text-sm font-bold text-gray-500">Nationality:</td>
                        <td class="text-sm pl-8">Thailand</td>
                    </tr>
                    <tr>
                        <td class="text-sm font-bold text-gray-500">Gender:</td>
                        <td class="text-sm pl-8">Male | Adult</td>
                    </tr>
                    <tr>
                        <td class="text-sm font-bold text-gray-500">Date of birth:</td>
                        <td class="text-sm pl-8">Jan 9, 1982</td>
                    </tr>
                </table>
            </div>

        </div>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl font-bold">Contact Information</h2>
            <p class="text-sm font-bold mt-6">GHGGG SADSADSSAD</p>
            <p class="text-sm mt-5 text-gray-500">
                Phone: &nbsp;&nbsp;+66&nbsp;&nbsp;09588***80
            </p>
            <p class="text-sm mt-5 text-gray-500">
                Email: &nbsp;&nbsp;&nbsp;ax***22@gmail.com
            </p>
        </div>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl font-bold">Featured Properties</h2>
        </div>

    </div>
</template>