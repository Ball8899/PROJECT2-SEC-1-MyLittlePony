<script setup>
import Likely from './Rating.vue';
import PaymentStatus from './PaymentStatus.vue';
import TotalAmount from './TotalAmount.vue';
import PromoCode from './PromoCode.vue';
import { storeToRefs } from "pinia";
import { useBooking } from "../../store/booking.js";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute , useRouter } from "vue-router";
import { updateItem, getItemById } from "../../utils/fetchUtil.js";


const bookingStore = useBooking();
const { hotelBookings } = storeToRefs(bookingStore);
const { getHotel } = bookingStore;
const route = useRoute();
const router = useRouter();
const hotelId = route.params.id
const hotels = ref({})


const currentHotel = computed(() => {
    return hotelBookings.value[0].hotel.find(
        (hotel) => String(hotel.id) === String(hotelId)
    );
});

const getHotels = async () => {
  try {
    hotels.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/hotels`,
      currentHotel.value.hotelId
    );
    
    
  } catch (error) {
    console.log(error);
  }
};



const status = ref('awaiting');
const countdown = ref(5 * 60);
const showMore = ref(false)
const showModal = ref(false);
const emits = defineEmits(['closeAll']);


let timer = ref(null);
const startCountdown = () => {
    if (countdown.value <= 0) {
        status.value = "Cancelled";
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

const cancelBooking = async () => {
    clearTimeout(timer.value);
    status.value = false;
    try {
        const simplifiedBooking = {
            id: currentHotel.value.id,
            fName: currentHotel.value.fName,
            lName: currentHotel.value.lName,
            email: currentHotel.value.email,
            phoneNumber: currentHotel.value.phoneNumber,
            hotelId: currentHotel.value.hotelId,
            roomId: currentHotel.value.roomId,
            hotelName: currentHotel.value.hotelName,
            price: currentHotel.value.price,
            dateBooking: currentHotel.value.dateBooking,
            timeBooking: currentHotel.value.timeBooking,
            roomAmount: currentHotel.value.roomAmount,
            nightAmount: currentHotel.value.nightAmount,
            checkInTime: currentHotel.value.checkInTime,
            checkInDate: currentHotel.value.checkInDate,
            checkOutTime: currentHotel.value.checkOutTime,
            checkOutDate: currentHotel.value.checkOutDate,
            approve: "Cancelled"
        };

        await updateItem(
            `${import.meta.env.VITE_APP_URL}/bookingHotel`,
            currentHotel.value.id,
            simplifiedBooking
        );

    } catch (error) {
        console.error("Error cancelling hotel booking:", error);
    }

    router.push({
        name: "HotelBookedContent"
    });
};



const toggleShowMore = () => {
    showMore.value = !showMore.value;
};

const openModal = () => {
    showModal.value = true;
}
const closeModal = () => {
    emits('closeAll');
    showModal.value = false;
};

const promoCodes = ref([
    { id: 1, icon: 'fa-solid fa-hotel', description: '฿300 off Hotel', discount: 300 },
    { id: 2, icon: 'fa-solid fa-hotel', description: '฿150 Off Hotel', discount: 150 }
]);

const selectedPromo = ref(null);


onMounted(() => {
    getHotels();
     if (!currentHotel.value) {
        getHotel();
    }
    
})

</script>


<template>



    <div class="bg-gray-200 min-h-screen p-2 sm:p-4">
        <div class="text-xs sm:text-sm text-gray-700 flex flex-wrap space-x-2 mx-4 sm:ml-24 mb-4">
            <router-link to="/flightBookedContent" class="text-blue-600 hover:underline">All Bookings</router-link>
            <span> > </span>
            <router-link to="/HotelBookedContent" class="text-blue-600 hover:underline">Hotel Bookings</router-link>
            <span> > </span>
            <span class="text-gray-900">Booking Details</span>
        </div>



        <PaymentStatus v-if="status" :status="currentHotel.approve"
            :reason="currentHotel.dateBooking" :bookingNo="currentHotel.hotelId">
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

        <PaymentStatus v-else :bookingNo="currentHotel.hotelId" pin="405">
            <template #action>
                <button
                    class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-blue-100 text-sm w-full sm:w-auto mt-2 sm:mt-0">
                    Book Again
                </button>
            </template>
        </PaymentStatus>
      
        <TotalAmount :totalAmount="currentHotel.price" :bookingTime="currentHotel.dateBooking"
        :selectedPromo="selectedPromo" />

        <div
            class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 flex items-center space-x-4 rounded-xl">
            <img src="https://picsum.photos/300/200" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg">
            <div class="flex-1 mt-[-16px] pl-2 ">
                <h2 class="text-xl font-bold text-gray-800">{{ currentHotel.hotelName }} 
                </h2>
                <p class="text-gray-500 text-sm mt-2">★★★★</p>
                <div class="text-gray-600 flex items-center mt-3 text-sm">
                    <i class="fa-solid fa-location-dot"></i>
                    <p class="pl-2">
                        {{ hotels.address }}
                    </p>
                </div>
                <div class="text-gray-600 flex items-center mt-1 text-sm">
                    <i class="fa-solid fa-phone"></i>
                    <p class="pl-2">
                        +66-095826441
                    </p>
                </div>

            </div>
        </div>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-gray-500 text-sm">Check-in</p>
                    <p class="text-lg font-bold text-gray-800 mt-1">{{ currentHotel.checkInDate }}</p>
                    <p class="text-gray-600 text-sm">{{ currentHotel.checkInTime }}</p>
                </div>
                <div class="flex items-center justify-center text-gray-700 mt-5 space-x-1">
                    <p class="text-sm">{{ currentHotel.nightAmount }}  Night</p>
                    <i class="fa-solid fa-moon"></i>
                </div>

                <div class="text-right">
                    <p class="text-gray-500 text-sm">Check-out</p>
                    <p class="text-lg font-bold text-gray-800 mt-1">{{ currentHotel.checkOutDate }}</p>
                    <p class="text-gray-600 text-sm">{{ currentHotel.checkOutTime }}</p>
                </div>
            </div>
            <p class="text-gray-500 text-sm mt-4">• All times are in the hotel's local time</p>
        </div>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-lg font-bold text-gray-900">Standard Double Or Twin Room · 1 Room</h2>
            <div class="flex items-center gap-x-4 text-gray-600 mt-2 text-sm">
                <div class="flex items-center gap-x-2">
                    <i class="fa-solid fa-bed"></i>
                    <p>1 double bed or 2 single beds</p>
                </div>
                <div class="flex items-center gap-x-2">
                    <i class="fa-solid fa-ban-smoking"></i>
                    <p>Non-smoking</p>
                </div>
                <div class="flex items-center gap-x-2">
                    <i class="fa-solid fa-user"></i>
                    <p>adults</p>
                </div>
                <div class="flex items-center gap-x-2">
                    <i class="fa-solid fa-house"></i>
                    <p>22m²</p>
                </div>
            </div>
            <hr class="my-4 border-gray-300">

            <div class="grid grid-cols-[150px_1fr] gap-4">
                <p class="font-bold text-sm">Meals</p>
                <div class="space-y-2">
                    <p class="text-sm">No meals</p>
                    <p class="text-sm">Extra breakfast available for purchase</p>
                    <div v-if="showMore">
                        <p class="text-sm">Extra breakfast: ฿ 180.00 per person</p>
                        <p class="text-sm">Style: Buffet</p>
                    </div>
                    <button @click="toggleShowMore"
                        class="flex items-center text-blue-500 mt-2 text-sm hover:underline">
                        {{ showMore ? 'Show Less ▲' : 'Show More ▼' }}
                    </button>
                </div>
            </div>
            <hr class="my-4 border-gray-300">

            <div class="py-2">
                <div class="grid grid-cols-[150px_1fr] gap-4">
                    <p class="font-bold text-sm">Purchased & Complimentary Services</p>
                    <div class="space-y-1">
                        <p class="text-sm">Free upgrade to Deluxe Double or Twin Room (1)</p>
                        <button @click="openModal" class="text-blue-500 hover:underline block text-sm">
                            View Details
                        </button>
                    </div>
                </div>
            </div>


            <div v-if="showModal" @click.self="closeModal"
                class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <div class="flex justify-between items-center">
                        <h3 class="text-base sm:text-xl font-bold">Travel Insurance</h3>
                        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                    </div>

                    <div class="mt-4">
                        <p class="text-sm mt-4 font-bold">
                            1. Free upgrade to Deluxe Double or Twin Room (1)
                        </p>
                        <div class="mt-3 space-y-2 text-gray-500 text-sm">
                            <div class="flex">
                                <p class="font-bold w-40">Reservation policy:</p>
                                <p class="flex-1">Advance booking not required</p>
                            </div>
                            <div class="flex">
                                <p class="font-bold w-40">Contact number:</p>
                                <p class="flex-1">+66-095826441</p>
                            </div>
                            <div class="flex">
                                <p class="font-bold w-40">Validity period:</p>
                                <p class="flex-1">Can be enjoyed once per room during your stay</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-lg font-bold text-gray-900">Guest Info</h2>
            <div class="grid grid-cols-[150px_1fr] gap-8 mt-3">
                <p class="font-bold text-sm">Names</p>
                <p class="text-sm">{{ currentHotel.fName }}{{ currentHotel.lName }}</p>
            </div>
            <hr class="my-4 border-gray-300">
            <div class="grid grid-cols-[150px_1fr] gap-8 mt-3">
                <p class="font-bold text-sm">Contact Info</p>
                <div class="text-sm flex items-center space-x-2">
                    <p>{{ currentHotel.phoneNumber }}</p>
                    <span class="text-gray-400">|</span>
                    <p>{{ currentHotel.email }}</p>
                </div>
            </div>
        </div>


        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl sm:text-xl font-bold">Your Add-ons</h2>
            <PromoCode v-model="selectedPromo" :promoCodes="promoCodes" :currentDiscount="selectedPromo" />
        </div>



        <Likely :improvementOptions="[
            'Reviews weren\'t helpful',
            'Too expensive',
            'Unsatisfactory JET.GO customer support',
            'Hard to pay',
            'Proof for reimbursement',
            'Unsatisfactory hotel stay',
            'Member Rewards & Trip Coins',
            'Room not available/price changed',
            'Complicated booking process',
            'Inaccurate hotel info',
            'Too few hotels to choose from',
            'Slow booking confirmation',
        ]" />




    </div>


</template>