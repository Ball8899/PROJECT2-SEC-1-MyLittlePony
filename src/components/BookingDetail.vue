<script setup>
import PaymentStatus from "./PaymentStatus.vue";
import Likely from "./Likely.vue";
import TotalAmount from "./TotalAmount.vue";
import { ref } from "vue";


const showInsuranceModal = ref(false);
const showPromoCodeModal = ref(false);

const togglePromoCodeModal = () => {
    showPromoCodeModal.value = !showPromoCodeModal.value;
};

const toggleInsuranceModal = () => {
    showInsuranceModal.value = !showInsuranceModal.value;
};

const feedbackData = ref({ rating: null, options: [], feedback: "" });

const handleFeedbackUpdate = (data) => {
    feedbackData.value = data;
    console.log("Feedback Updated:", feedbackData.value);
};
</script>

<template>
    <div class="bg-gray-200 min-h-screen p-4">
        <div class="text-sm text-gray-700 flex space-x-2 ml-24">
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
        <PaymentStatus>
            <template #status></template>
            <template #reason></template>
            <template #bookingNo>1111111111</template>
            <template #pin>505</template>
            <template #action>
                <button
                    class="border border-yellow-400 text-yellow-500 px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-yellow-100">
                    Book Again
                </button>
            </template>
        </PaymentStatus>



        <!--likely-->
        <Likely @update-feedback="handleFeedbackUpdate">
            <template #likely></template>
            <template #improvement-options></template>
        </Likely>
        <!--Flight-->
        <div class="bg-white p-6 shadow-md w-full max-w-3xl mt-4 ml-24">
            <h2 class="text-xl font-bold">Flight Details</h2>
            <p class="text-gray-600 text-sm mt-4">All times are in local time</p>
        </div>
        <!--Your Add-ons-->
        <div class="bg-white p-6 shadow-md w-full max-w-3xl mt-4 ml-24">
            <h2 class="text-xl font-bold">Your Add-ons</h2>
            <div class="grid grid-cols-2 gap-4 mt-6">
                <button @click="toggleInsuranceModal"
                    class="flex items-center justify-between w-full p-4 border transition text-black bg-gray-100 hover:border-blue-500 hover:bg-blue-100">
                    <div class="flex items-center space-x-2">
                        <span class="text-blue-600">🔷</span>
                        <span class="font-semibold text-sm">Insurance</span>
                    </div>
                    <span class="text-gray-500">›</span>
                </button>

                <button @click="togglePromoCodeModal"
                    class="flex items-center justify-between w-full p-4 border transition text-black bg-gray-100 hover:border-blue-500 hover:bg-blue-100">
                    <div class="flex items-center space-x-2">
                        <span class="text-blue-600">🔷</span>
                        <span class="font-semibold text-sm">Promo Code</span>
                    </div>
                    <span class="text-gray-500">›</span>
                </button>
            </div>

            <div v-if="showInsuranceModal" class="fixed inset-0 flex items-center justify-center  bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold">Travel Insurance</h3>
                        <button @click="toggleInsuranceModal" class="text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                    </div>

                    <p class="text-blue-500 text-sm mt-4 font-sans">
                        Total 13 Benefits >
                    </p>

                    <h4 class="font-bold mt-4">Insurance Information</h4>
                    <p class="text-gray-500 text-sm font-sans mt-1">
                        We are working hard to process your insurance and will notify you by
                        email once your insurance has been issued. Don't worry, the issuing
                        of your insurance won't affect your trip.
                    </p>

                    <div class="border p-3 mt-3 flex justify-between items-center">
                        <span class="font-semibold text-gray-500 text-sm">GHGGG SADSADSSAD ฿ 299.00</span>
                        <span class="text-gray-400 text-sm">Canceled</span>
                    </div>

                    <h4 class="font-bold mt-3">Need any help?</h4>
                    <p class="text-gray-500 text-sm">
                        · If you need to submit a claim request to the insurance company,
                        please contact them directly using the following methods:
                    </p>
                    <p class="mt-2 text-blue-600 text-sm font-semibold text-gray-500">
                        📞 +66 (2) 007 9017
                    </p>
                </div>
            </div>

            <div v-if="showPromoCodeModal" class="fixed inset-0 flex items-center justify-center bg-opacity-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full h-auto min-h-[300px]">

                    <div class="flex justify-between items-center">
                        <h2 class="text-lg font-bold text-gray-900">Promo Codes</h2>
                        <button @click="togglePromoCodeModal"
                            class="text-gray-500 hover:text-gray-700 text-xl">✖</button>
                    </div>

                    <div class="mt-16 space-y-4 ">
                        <div class="flex items-center justify-between p-5 border ">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center ">
                                    <span class="text-gray-600 text-xl">🚗</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-400">8% off Car Rentals</p>
                                    <a href="#" class="text-blue-600 text-sm underline">Terms & Conditions</a>
                                </div>
                            </div>
                            <button
                                class="px-4 py-1 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed mr-5">Canceled</button>
                        </div>

                        <div class="flex items-center justify-between p-5 border ">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center ">
                                    <span class="text-gray-600 text-xl">🚕</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-400">12% Off Airport Transfers</p>
                                    <a href="#" class="text-blue-600 text-sm underline">Terms & Conditions</a>
                                </div>
                            </div>
                            <button
                                class="px-4 py-1 bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed mr-5">Canceled</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!--Passenger Information-->
        <div class="bg-white p-6 shadow-md w-full max-w-3xl mt-4 ml-24">
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
        <div class="bg-white p-6 shadow-md w-full max-w-3xl mt-4 ml-24">
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
        <div class="bg-white p-6 shadow-md w-full max-w-3xl mt-4 ml-24">
            <h2 class="text-xl font-bold">Featured Properties</h2>
        </div>
    </div>
</template>