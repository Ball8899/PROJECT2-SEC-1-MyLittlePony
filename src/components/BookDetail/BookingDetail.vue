<script setup>
import PaymentStatus from '../BookDetail/PaymentStatus.vue';
import Likely from "../BookDetail/Likely.vue";
import TotalAmount from "../BookDetail/TotalAmount.vue";
import Navbar from '../Navbar.vue';
import FlightDetails from '../BookDetail/FlightDetails.vue';



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

const showInsuranceModal = ref(false);
const showPromoCodeModal = ref(false);
const status = ref('awaiting');
const showCancelModal = ref(false);
const showConfirmModal = ref(false);
const emits = defineEmits(['closeAllModals']);
const countdown = ref(15 * 60);


let timer = null;
const startCountdown = () => {
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            clearInterval(timer);
        }
    }, 1000);
};

const formattedTime = computed(() => {
    const minutes = Math.floor(countdown.value / 60);
    const seconds = countdown.value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

onMounted(startCountdown);
onUnmounted(() => clearInterval(timer));

const cancelBooking = () => {
    showCancelModal.value = false;
    showConfirmModal.value = true;
};

const confirmCancel = () => {
    status.value = "canceled";
    showConfirmModal.value = false;
}


const togglePromoCodeModal = () => {
    emits('closeAllModals');
    showPromoCodeModal.value = true;
};

const toggleInsuranceModal = () => {
    emits('closeAllModals');
    showInsuranceModal.value = true;
};
const closeAllModals = () => {
    emits('closeAllModals');
    showInsuranceModal.value = false;
    showPromoCodeModal.value = false;
    showCancelModal.value = false;
};

const feedbackData = ref({ rating: null, options: [], feedback: "" });

const handleFeedbackUpdate = (data) => {
    feedbackData.value = data;
};
const resetFeedback = () => {
    feedbackData.value = { rating: null, options: [], feedback: "" };
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
        <TotalAmount>
            <template #total-amount></template>
            <template #booking-total></template>
            <template #booking-time></template>
            <template #warning></template>
            <template #details></template>
        </TotalAmount>
        <PaymentStatus v-if="status === 'awaiting'">
            <template #status>
                <span class="text-orange-600 font-bold text-xl sm:text-xl">Awaiting Payment</span>
            </template>
            <template #reason>
                <p class="text-gray-600 text-sm mt-2 sm:text-sm">Please complete payment before 22:00, March 12, 2025</p>
            </template>
            <template #bookingNo>1622918183214445</template>
            <template #action>
                <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-2 sm:mt-0">
                     <button v-if="countdown > 0" class="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md w-full sm:w-auto text-sm">
                    Pay {{ formattedTime }}
                </button>
                <button v-else disabled class="bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md w-full sm:w-auto text-sm">
                    Payment Expired
                </button>
                <button @click="showCancelModal = true"
                    class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-blue-100 w-full sm:w-auto text-sm">
                    Cancel
                </button>
                </div>
            </template>
        </PaymentStatus>
        <PaymentStatus v-else>
            <template #status><span class="text-gray-800 font-bold text-lg sm:text-xl">Canceled</span></template>
            <template #reason><p class="text-gray-600 text-xs sm:text-sm mt-2">Reason for cancellation: Booking canceled by user</p></template>
            <template #bookingNo>1622918183214445</template>
            <template #pin>505</template>
            <template #action>
                <button
                    class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-blue-100 text-sm w-full sm:w-auto mt-2 sm:mt-0">
                    Book Again
                </button>
            </template>
        </PaymentStatus>
        <div v-if="showCancelModal" class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50"
            @click="closeAllModals">
            <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:w-96">
                <div class="flex items-center">
                    <i class="fa-solid fa-triangle-exclamation text-orange-500"></i>
                    <h2 class="text-base sm:text-lg font-bold ml-2 text-orange-500">Cancellation Notice</h2>
                </div>
                <p class="text-gray-600 mt-2 text-sm sm:text-sm">
                    Once a cancellation request is submitted, it cannot be withdrawn. Your itinerary will be canceled,
                    and you
                    will receive a refund. Are you sure you want to cancel?
                </p>
                <div class="mt-4 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <button @click="showCancelModal = false"
                        class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg text-sm w-full sm:w-auto ">
                        Back
                    </button>
                    <button @click="cancelBooking" class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm w-full sm:w-auto">
                        Continue
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
            <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:w-96">
                <div class="flex items-center space-x-2">
                    <i class="fa-solid fa-circle-check text-teal-500"></i>
                    <h2 class="text-base sm:text-lg font-bold ml-2 text-teal-600">Cancellation Notice</h2>
                </div>
                <p class="text-gray-600 mt-2 text-xs sm:text-sm ml-5">Your itinerary has been canceled</p>
                <div class="mt-4 flex justify-end">
                    <button @click="confirmCancel" class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm">
                        Got It
                    </button>
                </div>
            </div>
        </div>



        <!--likely-->
        <Likely @update-feedback="handleFeedbackUpdate" @reset-feedback="resetFeedback">
            <template #likely></template>
            <template #improvement-options></template>
        </Likely>
        <!--Flight-->
            <FlightDetails v-if="flightData" :flight="flightData">
            </FlightDetails>
        <!--Your Add-ons-->
        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4">
            <h2 class="text-xl sm:text-xl font-bold">Your Add-ons</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <button @click="toggleInsuranceModal"
                    class="flex items-center justify-between w-full p-4 sm:p-4 border transition text-black bg-gray-100 hover:border-blue-500 hover:bg-blue-100">
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-ticket"></i>
                        <span class="font-semibold text-xs sm:text-sm">Insurance</span>
                    </div>
                    <span class="text-gray-500">›</span>
                </button>

                <button @click="togglePromoCodeModal"
                    class="flex items-center justify-between w-full p-4 sm:p-4 border transition text-black bg-gray-100 hover:border-blue-500 hover:bg-blue-100">
                    <div class="flex items-center space-x-2">
                        <i class="fa-solid fa-ticket"></i>
                        <span class="font-semibold text-xs sm:text-sm">Promo Code</span>
                    </div>
                    <span class="text-gray-500">›</span>
                </button>
            </div>

            <div v-if="showInsuranceModal" @click.self="closeAllModals"
                class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
                <div  class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-lg">
                    <div class="flex justify-between items-center">
                        <h3 class="text-base sm:text-xl font-bold">Travel Insurance</h3>
                        <button @click="closeAllModals" class="text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                    </div>

                    <p class="text-blue-500 text-xs sm:text-sm mt-4 font-sans">
                        Total 13 Benefits >
                    </p>

                    <h4 class="font-bold mt-4 text-sm sm:text-base">Insurance Information</h4>
                    <p class="text-gray-500 text-xs sm:text-sm font-sans mt-1">
                        We are working hard to process your insurance and will notify you by
                        email once your insurance has been issued. Don't worry, the issuing
                        of your insurance won't affect your trip.
                    </p>

                    <div class="border p-2 sm:p-3 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <span class="font-semibold text-gray-500 text-xs sm:text-sm mb-2 sm:mb-0">GHGGG SADSADSSAD ฿ 299.00</span>
                        <span class="text-gray-400 text-xs sm:text-sm">Canceled</span>
                    </div>

                    <h4 class="font-bold mt-3 text-sm sm:text-base">Need any help?</h4>
                    <p class="text-gray-500 text-xs sm:text-sm">
                        · If you need to submit a claim request to the insurance company,
                        please contact them directly using the following methods:
                    </p>
                    <p class="mt-2 text-blue-600 text-xs sm:text-sm font-semibold text-gray-500">
                        📞 +66 (2) 007 9017
                    </p>
                </div>
            </div>

            <div v-if="showPromoCodeModal" @click.self="closeAllModals"
                class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
                <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl">

                    <div class="flex justify-between items-center">
                        <h2 class="text-base sm:text-lg font-bold text-gray-900">Promo Codes</h2>
                        <button @click="closeAllModals"
                            class="text-gray-500 hover:text-gray-800 text-xl">✖</button>
                    </div>

                    <div class="mt-8 sm:mt-16 space-y-3 sm:space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-5 border">
                            <div class="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
                                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span class="text-gray-600 text-base sm:text-xl">🚗</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-400 text-xs sm:text-sm">8% off Car Rentals</p>
                                    <a href="#" class="text-blue-600 text-xs sm:text-sm underline">Terms & Conditions</a>
                                </div>
                            </div>
                            <button
                                class="px-3 sm:px-4 py-1 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed text-xs sm:text-sm mt-2 sm:mt-0 sm:mr-5">Canceled</button>
                        </div>

                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-5 border">
                            <div class="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
                                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span class="text-gray-600 text-base sm:text-xl">🚕</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-400 text-xs sm:text-sm">12% Off Airport Transfers</p>
                                    <a href="#" class="text-blue-600 text-xs sm:text-sm underline">Terms & Conditions</a>
                                </div>
                            </div>
                            <button
                                class="px-3 sm:px-4 py-1 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed text-xs sm:text-sm mt-2 sm:mt-0 sm:mr-5">Canceled</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!--Passenger Information-->
        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4">
            <h2 class="text-xl font-bold">Passenger Information</h2>
            <p class="text-gray-600 text-sm mt-1">
                Passport or ID information is not required at the time of booking.
                However, please ensure that you have a passport or ID valid for travel
                when you check in.
            </p>

            <div class="mt-6">
                <p class="text-base font-bold">
                    <span>1: GHGGG (First name)</span>
                    <span class="ml-2"><strong>SADSADSSAD</strong> (Last name)</span>
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
                </p>
            </div>
        </div>
        <!--Contact Information-->
        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4">
            <h2 class="text-xl font-bold">Contact Information</h2>
            <p class="text-sm font-bold mt-6">GHGGG SADSADSSAD</p>
            <p class="text-sm mt-5 text-gray-500">
                Phone: &nbsp;&nbsp;+66&nbsp;&nbsp;09588***80
            </p>
            <p class="text-sm mt-5 text-gray-500">
                Email: &nbsp;&nbsp;&nbsp;ax***22@gmail.com
            </p>
        </div>
        <!--Featured Properties -->
        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4">
            <h2 class="text-xl font-bold">Featured Properties</h2>
            
        </div>
    </div>
</template>