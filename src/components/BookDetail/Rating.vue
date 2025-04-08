<script setup>
import { ref, defineProps, defineEmits } from "vue";

const emits = defineEmits(["update-feedback", "reset-feedback"]);

const selectedRating = ref(null);
const selectedOptions = ref([]);
const feedback = ref("");
const submitted = ref(false);

defineProps({
  title: {
    type: String,
    default: "How likely are you to recommend booking flights on JET.GO to a friend or colleague?"
  },
  improvementOptions: {
    type: Array,
    default: () => [
      "Flight Information", "Customer Support", "Baggage", "Booking Process",
      "Price/Promotion", "Ticket Issuing", "Payment Status", "Payment Methods",
      "Changes/Refunds", "Insurance", "Check-in", "Seat Selection", "Features",
      "Add-ons", "Receipts", "Interface", "Travel Policies", "Airline Services"
    ]
  }
});

const toggleOption = (option) => {
    if (selectedOptions.value.includes(option)) {
        selectedOptions.value = selectedOptions.value.filter(
            (item) => item !== option
        );
    } else {
        selectedOptions.value.push(option);
    }
    updateFeedback();
};

const setRating = (rating) => {
    if (selectedRating.value === rating) {
        selectedRating.value = null;
    }else{
        selectedRating.value = rating;
    }
     updateFeedback();
};


const updateFeedback = () => {
    emits("update-feedback", { rating: selectedRating.value, options: selectedOptions.value, feedback: feedback.value });
};

const submitFeedback = () => {
    submitted.value = true;

    selectedRating.value = null;
    selectedOptions.value = [];
    feedback.value = "";

    emits("reset-feedback");
}


</script>

<template>
    <div class="bg-white p-7 sm:p-7  shadow-md w-full max-w-3xl mt-4 mx-auto sm:ml-24 rounded-xl">

        <div v-if="submitted" class="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
            <div class="w-10 h-10 flex items-center justify-center bg-teal-400  rounded-full">
                <i class="fa-solid fa-check"></i>
            </div>
            <p class="text-base sm:text-lg font-semibold text-gray-800">
                Thanks for your time! Your feedback is greatly appreciated.
            </p>
        </div>

        <div v-else>
            <h2 class="text-base sm:text-lg font-bold">
             {{ title }}
            </h2>
            <div class="flex flex-col sm:flex-row items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                <div class="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-0">
                    <span class="text-gray-600 text-xs sm:text-sm whitespace-nowrap">Not at all likely</span>
                <span class="text-lg sm:text-xl">😢</span>
                </div>
                <div class="flex flex-wrap justify-center sm:justify-start gap-1 sm:space-x-2 w-full sm:w-auto">
                    <button v-for="num in 10" :key="num" @click="setRating(num)"
                        :class="['w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium transition',
                            selectedRating === num ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-100 border-gray-300 hover:bg-blue-50 text-blue-600']">
                        {{ num }}
                    </button>
                </div>
                <div class="flex items-center space-x-1 sm:space-x-2 mt-2 sm:mt-0">
                    <span class="text-xl">🤩</span>
                <span class="text-gray-600 text-xs sm:text-sm whitespace-nowrap">Extremely likely</span>
                </div>
            </div>

            <div v-if="selectedRating !== null" class="mt-6">
                <h3 class="font-semibold text-sm">What could JET.GO improve?</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        <button v-for="option in improvementOptions" :key="option" @click="toggleOption(option)"
                            class="relative flex items-center justify-center px-3 sm:px-4 py-2 border-2 rounded-lg text-xs sm:text-sm transition duration-200"
                            :class="{ 'bg-blue-100 border-blue-500 text-blue-600': selectedOptions.includes(option), 'bg-white border-gray-300 hover:bg-gray-100': !selectedOptions.includes(option) }">
                            {{ option }}
                            <div v-if="selectedOptions.includes(option)"
                                class="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-br-lg">
                                <svg class="w-4 h-4 text-white absolute bottom-1 right-1" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </button>
                </div>
                <textarea v-model="feedback" @input="updateFeedback"
                    class="w-full mt-4 p-2 border rounded-md bg-gray-100 text-xs sm:text-sm"
                    placeholder="How can we improve your experience using JET.GO?"></textarea>
                <div class="flex justify-end mt-2">
                    <button @click="submitFeedback"
                        class="border border-blue-400 text-blue-500 px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-yellow-100 text-sm w-full sm:w-auto">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



