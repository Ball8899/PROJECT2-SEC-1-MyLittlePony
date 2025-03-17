<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
    flight: Object,

})

const emit = defineEmits(["close"]);
const selectedFlight = ref(null);



const openDetails = (flight) => {
    selectedFlight.value = flight;
};

const closeDetails = () => {
    selectedFlight.value = null;
    emit("close");
};


</script>

<template>
    <div class="bg-white p-7 shadow-md w-full max-w-3xl mt-4 mx-auto sm:ml-24">

        <h2 class="text-xl font-bold">Flight Details</h2>
        <p class="text-gray-600 text-sm mt-1">All times are in local time</p>

        <div class="mt-4">
            <div class="flex flex-wrap items-center space-x-2 mb-2">
                <span class="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded mb-1">
                    Depart
                </span>
                <p class="font-semibold">{{ flight.depart.date }} | {{ flight.depart.route }}</p>
            </div>


            <div class="mt-4 flex flex-col sm:flex-row items-center justify-between">

                <div class="mb-4 sm:mb-0 sm:ml-16 text-center">
                    <p class="text-base font-medium">{{ flight.depart.time.departure }}</p>
                    <p class="text-sm text-gray-500">{{ flight.depart.airport.departure }}</p>
                </div>
                <div class="flex-1 flex justify-center items-center px-2 sm:px-6 my-4 sm:my-0">
                    <div class="w-full flex items-center">
                        <div class="h-2 w-2 rounded-full bg-black"></div>
                        <div class="h-[1px] flex-1 bg-gray-400"></div>
                        <i class="fa-solid fa-plane"></i>
                        <div class="h-[1px] flex-1 bg-gray-400"></div>
                        <div class="h-2 w-2 rounded-full bg-black"></div>
                    </div>
                </div>
                <div class="text-center sm:mr-30">
                    <p class="text-base font-medium ">{{ flight.depart.time.arrival }}</p>
                    <p class="text-sm text-gray-500">{{ flight.depart.airport.arrival }}</p>
                </div>
            </div>


            <div className="h-px w-full bg-gray-300 my-4 mt-6"></div>



            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                    <p className="text-gray-500 text-sm">Class</p>
                    <p class="text-sm text-gray-700 mr-7">{{ flight.depart.airline }}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Aircraft</p>
                    <p class="text-sm text-gray-700 mt-1">{{ flight.depart.class }}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Terminal</p>
                    <p class="text-sm text-gray-700 mt-1">{{ flight.depart.aircraft }}</p>
                </div>

            </div>


            <div class="mt-4 bg-gray-100 p-2 rounded flex justify-between items-center">
                <p class="text-sm text-green-600">[Canceled] TURBO SEE Canceled</p>
                <div class="flex items-center space-x-1">
                    <p @click="openDetails(flight)" class="text-blue-500 text-sm font-medium hover:underline">View
                        Details</p>
                    <span class="text-blue-500 text-sm font-medium">→</span>
                </div>
            </div>

            <hr class="border-gray-300 mt-5" />

            <div class="mt-4">
                <div class="flex items-center space-x-2">
                    <span class="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded">
                        Depart
                    </span>
                    <p class="font-semibold">{{ flight.return.date }} | {{ flight.return.route }}</p>
                </div>


                <div class="mt-4 flex flex-col sm:flex-row items-center justify-between">

                    <div class="text-center mb-4 sm:mb-0 sm:ml-16">
                        <p class="text-base font-medium">{{ flight.return.time.departure }}</p>
                        <p class="text-sm text-gray-500">{{ flight.return.airport.departure }}</p>
                    </div>
                    <div class="flex-1 flex justify-center items-center px-2 sm:px-6 my-4 sm:my-0">
                        <div class="w-full flex items-center">
                            <div class="h-2 w-2 rounded-full bg-black"></div>
                            <div class="h-[1px] flex-1 bg-gray-400"></div>
                            <i class="fa-solid fa-plane"></i>
                            <div class="h-[1px] flex-1 bg-gray-400"></div>
                            <div class="h-2 w-2 rounded-full bg-black"></div>
                        </div>
                    </div>
                    <div class="text-center sm:mr-30">
                        <p class="text-base font-medium ">{{ flight.return.time.arrival }}</p>
                        <p class="text-sm text-gray-500">{{ flight.return.airport.arrival }}</p>
                    </div>
                </div>


                <div className="h-px w-full bg-gray-300 my-4 mt-6"></div>



                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    <div>
                        <p className="text-gray-500 text-sm">Class</p>
                        <p class="text-sm text-gray-700 mr-7">{{ flight.return.airline }}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Aircraft</p>
                        <p class="text-sm text-gray-700 mt-1">{{ flight.return.class }}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Terminal</p>
                        <p class="text-sm text-gray-700 mt-1">{{ flight.return.aircraft }}</p>
                    </div>

                </div>

                <div class="mt-4 bg-gray-100 p-2 rounded flex justify-between items-center">
                    <p class="text-sm text-green-600">[Canceled] TURBO SEE Canceled</p>
                    <div class="flex items-center space-x-1">
                        <p @click="openDetails(flight)" class="text-blue-500 text-sm font-medium hover:underline">View
                            Details</p>
                        <span class="text-blue-500 text-sm font-medium">→</span>
                    </div>
                </div>

            </div>



        </div>

        <div v-if="selectedFlight" @click.self="closeDetails"
            class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
            <div class="bg-white p-4 sm:p-6 shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl rounded-none">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-base font-bold text-gray-800">Airline Booking Reference and E-ticket No.</h3>
                    <button @click="closeDetails" class="text-gray-500 hover:text-gray-700 text-xl sm:text-xl">
                        ✕
                    </button>
                </div>

                <div class="border border-gray-200 rounded mb-4">
                    <div
                        class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-200">
                        <div class="text-sm font-semibold ">
                            {{ selectedFlight.depart.route }}
                        </div>
                        <div class="flex items-center">
                            <span class="text-gray-700 text-sm">{{ flight.depart.airline }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-4">
                        <div class="text-sm">TURBO SEE</div>
                        <div class=" text-sm">{{ flight.return.status || 'Canceled' }}</div>
                    </div>
                </div>

                <div v-if="flight.return" class="border border-gray-200 rounded">
                    <div
                        class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-200">
                        <div class="text-sm font-semibold">
                            {{ selectedFlight.return.route }}
                        </div>
                        <div class="flex items-center">
                            <span class="text-gray-700 text-sm"> {{ flight.return.airline }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-4">
                        <div class="text-sm">TURBO SEE</div>
                        <div class=" text-sm">{{ flight.return.status || 'Canceled' }}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>