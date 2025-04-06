<script setup>
import { defineProps } from "vue";

const props = defineProps({
    message: {
        type: String,
    },
});
</script>

<template>
    <div>
        <p class="absolute -mt-12 bg-red-500 font-light tracking-wide px-2 py-2 w-[250px] text-xs text-white">
           {{message}}
        </p>
        <span
            class="w-0 h-0 ml-5 absolute border-t-8 border-t-red-600/85 border-l-8 border-l-transparent border-r-8 border-r-transparent"></span>
    </div>
</template>

<style scoped></style>
