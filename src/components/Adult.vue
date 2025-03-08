<script setup>
import { ref, computed } from 'vue'
const countAdult = ref(1)
const countChildrn = ref(0)

const noun = computed(() => countAdult.value > 1 ? 'Adults' : 'Adult')
</script>

<template>
 <div class=" bg-white w-[300px] text-lg">
   <div class=" flex flex-row">
        <p>{{ `${countAdult} ${noun}` }}</p>
        <p v-if="countChildrn > 0">{{ `${countChildrn} Children` }}</p>
   </div>
   <p>Please select the exact number of passengers to view the best prices</p>
   <div>
    <div class="flex flex-row">
        <p>Adults</p>
        <div class="flex flex-row">
            <button @click="countAdult--">-</button>
            <p>{{ countAdult }}</p>
            <button @click="countAdult++">+</button>
        </div>
    </div>
    <div class="flex flex-row">
        <p>Children</p>
        <div class="flex flex-row">
            <button @click="countChildrn--">-</button>
            <p>{{ countChildrn }}</p>
            <button @click="countChildrn++">+</button>
        </div>
    </div>
   </div>
 </div>
</template>


<style scoped>
body {
 font-family: "Raleway";
}
@media (min-width: 1024px) {
}
</style>