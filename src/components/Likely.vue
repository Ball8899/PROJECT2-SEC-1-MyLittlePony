<script setup>
import { ref } from "vue";

const emits = defineEmits(['update-feedback'])

const selectedRating = ref(null);
const selectedOptions = ref([]);
const feedback = ref("");

const improvementOptions = [
    "Flight Information",
    "Customer Support",
    "Baggage",
    "Booking Process",
    "Price/Promotion",
    "Ticket Issuing",
    "Payment Status",
    "Payment Methods",
    "Changes/Refunds",
    "Insurance",
    "Check-in",
    "Seat Selection",
    "Features",
    "Add-ons",
    "Receipts",
    "Interface",
    "Travel Policies",
    "Airline Services",
];

const toggleOption = (option) => {
    if (selectedOptions.value.includes(option)) {
        selectedOptions.value = selectedOptions.value.filter(
            (item) => item !== option
        );
    } else {
        selectedOptions.value.push(option);
    }
    emits("update-feedback", { rating: selectedRating.value, options: selectedOptions.value, feedback: feedback.value });
};

const setRating = (rating) => {
    selectedRating.value = rating
    emits("update-feedback", { rating: selectedRating.value, options: selectedOptions.value, feedback: feedback.value });
}

const updateFeedback = () => {
    emits("update-feedback", { rating: selectedRating.value, options: selectedOptions.value, feedback: feedback.value });
};
</script>

<template>
    <!--likely-->
    <div class="bg-white p-7 shadow-md w-full max-w-3xl mt-4 ml-24">
        <h2 class="text-lg font-bold">
            <slot name="likely">How likely are you to recommend booking flights on JET.GO to a friend
                or colleague?</slot>
        </h2>
        <div class="flex items-center mt-4 space-x-2">
            <span class="text-gray-600 text-sm whitespace-nowrap">Not at all likely</span>
            <span class="text-xl">😢</span>
            <div class="flex space-x-2">
                <button v-for="num in 10" :key="num" @click="setRating(num)" :class="[
                    'w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium transition text-blue-600 ', selectedRating === num
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-blue-100 border-gray-300 hover:bg-blue-50 text-blue-700',
                ]">
                    {{ num }}
                </button>
            </div>

            <span class="text-xl">🤩</span>
            <span class="text-gray-600 text-sm whitespace-nowrap">Extremely likely</span>
        </div>

        <div v-if="selectedRating !== null" class="mt-6">
            <h3 class="font-semibold text-sm">What could JET.GO improve?</h3>
            <div class="grid grid-cols-3 gap-2 mt-2">
                <slot name="improvement-options">
                    <button v-for="option in improvementOptions" :key="option" @click="toggleOption(option)"
                        class="relative flex items-center justify-center px-4 py-2 border-2 rounded-lg text-sm transition duration-200"
                        :class="{
                            'bg-blue-100 border-blue-500 text-blue-600': selectedOptions.includes(option),
                            'bg-white border-gray-300 hover:bg-gray-100': !selectedOptions.includes(option)
                        }">
                        {{ option }}
                        <div v-if="selectedOptions.includes(option)"
                            class="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-br-lg">
                            <svg class="w-4 h-4 text-white absolute bottom-1 right-1" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </button>
                </slot>
            </div>
            <textarea v-model="feedback" @input="updateFeedback"
                class="w-full mt-4 p-2 border rounded-md bg-gray-100 text-sm"
                placeholder="How can we improve your experience using JET.GO?"></textarea>
            <div class="flex justify-end mt-2">
                <button
                    class="border border-yellow-400 text-yellow-500 px-4 py-2 rounded-lg shadow-sm bg-transparent hover:bg-yellow-100">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>
