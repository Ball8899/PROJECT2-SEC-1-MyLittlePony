<script setup>
import PaymentStatus from "./PaymentStatus.vue";
import Likely from "./Likely.vue";
import TotalAmount from "./TotalAmount.vue";
import PromoCode from "./PromoCode.vue";
import { storeToRefs } from "pinia";
import { useBooking } from "../../store/booking.js";
import { useRoute , useRouter } from "vue-router";
import { updateItem, getItems } from "../../utils/fetchUtil.js";
import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    watchEffect,
    defineEmits,
} from "vue";
const bookingStore = useBooking();
const { flightsBookings } = storeToRefs(bookingStore);
const { getBooking } = bookingStore;
const route = useRoute();
const router = useRouter();
const bookId = route.params.id;
const bookings = ref([])

const currentBooking = computed(() => {
    return flightsBookings.value.find(
        (book) => String(book.id) === String(bookId)
    );
});

const flight = ref({});
const arrival = ref({});
const departure = ref({});
const pricing = ref({});
const airportDeparture = ref({});
const airportArrival = ref({});
const flightDetails = ref({});
const contact = ref({});
const passenger = ref({});
const approve = ref({});

watchEffect(() => {
    flight.value = currentBooking.value.flight;
    departure.value = currentBooking.value.flight.departure;
    arrival.value = currentBooking.value.flight.arrival;
    pricing.value = currentBooking.value.flight.pricing;
    airportDeparture.value = currentBooking.value.flight.departure.airport;
    airportArrival.value = currentBooking.value.flight.arrival.airport;
    flightDetails.value = currentBooking.value.flight.flightDetails;
    contact.value = currentBooking.value.contact;
    passenger.value = currentBooking.value.passenger;
    approve.value = currentBooking.value.approve;

});

const emit = defineEmits(["close"]);
const selectedFlight = ref(null);
const isReturnFlight = ref(false);

const openDetails = (flight, isReturn = false) => {
    selectedFlight.value = flight;
    isReturnFlight.value = isReturn;
};
const closeDetails = () => {
    selectedFlight.value = null;
    emit("close");
};

const status = computed(() => {
    return currentBooking.value?.approve === "Waiting";
});
const countdown = ref(Math.floor(1 * 60));
const timer = ref(null);
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`;
});

onMounted(startCountdown);
onUnmounted(() => clearTimeout(timer.value));

const getFlightsBooking = async () => {
    try {
        bookings.value = await getItems(
            `${import.meta.env.VITE_APP_URL}/flightBooking`
        );
    } catch (error) {
        console.log(error);
    }
}


const cancelBooking = async () => {
    clearTimeout(timer.value);
    status.value = false;
    try {
        const simplifiedBooking = {
            id: currentBooking.value.id,
            flight: currentBooking.value.flight.id || currentBooking.value.flight,
            passenger: currentBooking.value.passenger,
            contact: currentBooking.value.contact,
            bookingDate: currentBooking.value.bookingDate,
            approve: "Cancelled"
        };

        await updateItem(
            `${import.meta.env.VITE_APP_URL}/flightBooking`,
            currentBooking.value.id,
            simplifiedBooking
        );


    } catch (error) {
        console.error("Error cancelling booking:", error);
    }

    router.push({
        name: "flightBookedContent"
    })


};



const formattedBookingDate = computed(() => {

    const date = new Date(currentBooking.value.bookingDate);
    return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
});

const promoCodes = ref([
    { id: 1, icon: "fa-solid fa-plane", description: "฿500 Off", discount: 500 },
    { id: 2, icon: "fa-solid fa-plane", description: "฿350 Off", discount: 350 },
]);

const selectedPromo = ref(null);

onMounted(() => {
    getFlightsBooking()
    if (!currentBooking.value) {
        getBooking();
    }
});

</script>

<template>
    <div class="bg-gray-200 min-h-screen p-2 sm:p-4">
        <div class="text-xs sm:text-sm text-gray-700 flex flex-wrap space-x-2 mx-4 sm:ml-24 mb-4">

            <router-link to="/flightBookedContent" class="text-blue-600 hover:underline">All Bookings</router-link>
            <span> > </span>
            <a href="" class="text-blue-600 hover:underline">Flight Bookings</a>
            <span> > </span>
            <span class="text-gray-900">Booking Details</span>
        </div>

        <PaymentStatus v-if="status" :status="approve" :reason="formattedBookingDate" :bookingNo="currentBooking.id">
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

        <PaymentStatus v-else :bookingNo="currentBooking.id" pin="405">
            <template #action>
                <button
                    class="border border-blue-400 text-blue-500 px-3 sm:px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-blue-100 text-sm w-full sm:w-auto mt-2 sm:mt-0">
                    Book Again
                </button>
            </template>
        </PaymentStatus>

        <TotalAmount :totalAmount="pricing.basePrice" :bookingTime="formattedBookingDate"
            :selectedPromo="selectedPromo" />

        <Likely />

        <div class="bg-white p-7 shadow-md w-full max-w-3xl mt-4 mx-auto sm:ml-24">
            <h2 class="text-xl font-bold">Flight Details</h2>
            <p class="text-gray-600 text-sm mt-1">All times are in local time</p>

            <div class="mt-4">
                <div class="flex flex-wrap items-center space-x-2 mb-2">
                    <span class="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded mb-1">
                        Depart
                    </span>
                    <p class="font-semibold">
                        {{ departure.date }} | {{ airportDeparture.city }} -
                        {{ airportArrival.city }}
                    </p>
                </div>

                <div class="mt-4 flex flex-col sm:flex-row items-center justify-between">
                    <div class="mb-4 sm:mb-0 sm:ml-6 text-center">
                        <p class="text-base font-medium">{{ airportDeparture.code }}</p>
                        <p class="text-sm text-gray-500">{{ airportDeparture.name }}</p>
                    </div>
                    <div class="flex-1 flex justify-center items-center px-2 sm:px-6 my-4 sm:my-0">
                        <div class="w-full flex items-center">
                            <div class="h-2 w-2 rounded-full bg-blue-300"></div>
                            <div class="h-[1px] bg-blue-300 flex-grow"></div>
                            <i class="fa-solid fa-plane text-blue-500"></i>
                            <div class="h-[1px] bg-blue-500 flex-grow"></div>
                            <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                    </div>
                    <div class="text-center sm:mr-6">
                        <p class="text-base font-medium">{{ airportArrival.code }}</p>
                        <p class="text-sm text-gray-500">{{ airportArrival.name }}</p>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-300 my-4 mt-6"></div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-4 mt-4">
                    <div>
                        <p class="text-gray-500 text-sm font-medium">Airline</p>
                        <p class="text-sm text-gray-700 font-semibold">
                            {{ flightDetails.airline }}
                        </p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-medium">Class</p>
                        <p class="text-sm text-gray-700 font-semibold mt-1">
                            {{ flightDetails.class }}
                        </p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-medium">Flight Number</p>
                        <p class="text-sm text-gray-700 font-semibold mt-1">
                            {{ flightDetails.flightNumber }}
                        </p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-sm font-medium">Aircraft</p>
                        <p class="text-sm text-gray-700 font-semibold mt-1">
                            {{ flightDetails.aircraft }}
                        </p>
                    </div>
                </div>

                <div class="mt-4 bg-gray-100 p-2 rounded flex justify-between items-center">
                    <p class="text-sm text-green-600">[Name] {{ contact[0].name }}</p>
                    <div class="flex items-center space-x-1">
                        <p @click="openDetails(flight)" class="text-blue-500 text-sm font-medium hover:underline">
                            View Details
                        </p>
                        <span class="text-blue-500 text-sm font-medium">→</span>
                    </div>
                </div>

                <hr class="border-gray-300 mt-5" />

                <div class="mt-6">
                    <div class="flex items-center space-x-2">
                        <span class="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded">
                            Arrival
                        </span>
                        <p class="font-semibold">
                            {{ arrival.date }} | {{ airportArrival.city }} -
                            {{ airportDeparture.city }}
                        </p>
                    </div>

                    <div class="mt-4 flex flex-col sm:flex-row items-center justify-between">
                        <div class="mb-4 sm:mb-0 sm:ml-14 text-center">
                            <p class="text-base font-medium">{{ airportArrival.code }}</p>
                            <p class="text-sm text-gray-500">{{ airportArrival.name }}</p>
                        </div>
                        <div class="flex-1 flex justify-center items-center px-2 sm:px-6 my-4 sm:my-0">
                            <div class="w-full flex items-center">
                                <div class="h-2 w-2 rounded-full bg-blue-300"></div>
                                <div class="h-[1px] bg-blue-300 flex-grow"></div>
                                <i class="fa-solid fa-plane text-blue-500"></i>
                                <div class="h-[1px] bg-blue-500 flex-grow"></div>
                                <div class="h-2 w-2 rounded-full bg-blue-500"></div>
                            </div>
                        </div>
                        <div class="text-center">
                            <p class="text-base font-medium">{{ airportDeparture.code }}</p>
                            <p class="text-sm text-gray-500">{{ airportDeparture.name }}</p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gray-300 my-4 mt-6"></div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-4 mt-4">
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Airline</p>
                            <p class="text-sm text-gray-700 font-semibold">
                                {{ flightDetails.airline }}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Class</p>
                            <p class="text-sm text-gray-700 font-semibold mt-1">
                                {{ flightDetails.class }}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Flight Number</p>
                            <p class="text-sm text-gray-700 font-semibold mt-1">
                                {{ flightDetails.flightNumber }}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm font-medium">Aircraft</p>
                            <p class="text-sm text-gray-700 font-semibold mt-1">
                                {{ flightDetails.aircraft }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-4 bg-gray-100 p-2 rounded flex justify-between items-center">
                        <p class="text-sm text-green-600">[Name] {{ contact[0].name }}</p>
                        <div class="flex items-center space-x-1">
                            <p @click="openDetails(flight, true)"
                                class="text-blue-500 text-sm font-medium hover:underline">
                                View Details
                            </p>
                            <span class="text-blue-500 text-sm font-medium">→</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="selectedFlight" @click.self="closeDetails"
                class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
                <div class="bg-white p-4 sm:p-6 shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl rounded-none">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-base font-bold text-gray-800">
                            Airline Booking Reference and E-ticket No.
                        </h3>
                        <button @click="closeDetails" class="text-gray-500 hover:text-gray-700 text-xl sm:text-xl">
                            ✕
                        </button>
                    </div>

                    <div class="border border-gray-200 rounded mb-4">
                        <div
                            class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-200">
                            <div class="text-sm font-semibold">
                                {{
                                    isReturnFlight
                                        ? airportArrival.city + " - " + airportDeparture.city
                                        : airportDeparture.city + " - " + airportArrival.city
                                }}
                            </div>
                            <div class="flex items-center">
                                <span class="text-gray-700 text-sm">{{
                                    flightDetails.airline
                                    }}</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center p-4">
                            <div class="text-sm">[Name] {{ contact[0].name }}</div>
                            <div class="text-sm">
                                Time :
                                {{
                                    isReturnFlight
                                        ? arrival.time + " - " + departure.time
                                        : departure.time + " - " + arrival.time
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white p-4 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl sm:text-xl font-bold">Your Add-ons</h2>
            <PromoCode v-model="selectedPromo" :promoCodes="promoCodes" :currentDiscount="selectedPromo" />
        </div>

        <div class="bg-white p-6 shadow-lg w-full max-w-3xl mx-auto sm:ml-24 mt-6 rounded-xl">
            <h2 class="text-2xl font-bold text-gray-800">Passenger Information</h2>
            <p class="text-gray-600 text-sm mt-2">
                Passport or ID information is not required at the time of booking.
                However, please ensure that you have a passport or ID valid for travel
                when you check in.
            </p>

            <div class="mt-6 bg-gray-100 p-4 rounded-lg">
                <div class="flex items-center space-x-3">
                    <div class="bg-blue-500 text-white w-8 h-8 flex items-center justify-center font-bold rounded-full">
                        1
                    </div>
                    <div class="text-lg font-bold text-gray-900">
                        {{ passenger[0].firstName }} {{ passenger[0].lastName }}
                    </div>
                </div>

                <div class="mt-4 space-y-2">
                    <div class="grid grid-cols-[120px_auto] gap-x-2 bg-white p-3 rounded-lg shadow-sm">
                        <span class="text-sm font-bold text-gray-500">Nationality:</span>
                        <span class="text-sm text-gray-600">{{
                            passenger[0].nationality
                            }}</span>
                    </div>
                    <div class="grid grid-cols-[120px_auto] gap-x-2 bg-white p-3 rounded-lg shadow-sm">
                        <span class="text-sm font-bold text-gray-500">Gender:</span>
                        <span class="text-sm text-gray-600">{{ passenger[0].gender }}</span>
                    </div>
                    <div class="grid grid-cols-[120px_auto] gap-x-2 bg-white p-3 rounded-lg shadow-sm">
                        <span class="text-sm font-bold text-gray-500"> Date of birth:</span>
                        <span class="text-sm text-gray-600">{{ passenger[0].dob }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white p-5 sm:p-6 shadow-md w-full max-w-3xl mx-auto sm:ml-24 mt-4 rounded-xl">
            <h2 class="text-xl font-bold text-gray-900">Contact Information</h2>

            <div class="mt-4 p-4 bg-gray-100 rounded-lg">
                <p class="text-sm font-semibold text-gray-800">{{ contact[0].name }}</p>

                <div class="mt-3 space-y-2">
                    <div class="flex items-center space-x-2">
                        <span class="text-gray-500">Phone:</span>
                        <span class="text-gray-900 font-medium text-sm">{{
                            contact[0].phone
                            }}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-gray-500">Email:</span>
                        <span class="text-gray-900 font-medium text-sm">{{
                            contact[0].email
                            }}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
