<script setup>
import { computed, ref ,onMounted,onUnmounted} from 'vue';

const collectImgs = [
  {
    id: 1,
    img: '/src/assets/image/p2.png'
  },
  {
    id: 2,
    img: '/src/assets/image/p3.png'
  },
  {
    id: 3,
    img: '/src/assets/image/p4.png'
  },
  {
    id:4,
    img:'/src/assets/image/p5.png'
  },
  {
    id:5,
    img:'/src/assets/image/p6.png'
  },
  {
    id:6,
    img:'/src/assets/image/p7.png'
  },
];

const itemImage = 3;
const position = ref(0);
let timeout = null;

const startAutoSlide = () =>{
  stopAutoSlide();
  timeout = setTimeout(() => {
    slideNext();
    startAutoSlide();
  },3000)
}

const stopAutoSlide = () =>{
  if(timeout){
    clearTimeout(timeout)
    timeout = null
  }
}
onMounted(startAutoSlide);
onUnmounted(stopAutoSlide);

const restartAutoSlide = () =>{
  stopAutoSlide()
  startAutoSlide()
}

const canSlidePrev = computed(() => position.value > 0);
const canSlideNext = computed(() => position.value < collectImgs.length - itemImage);

const slidePrev = () => {
  if (canSlidePrev.value) {
    position.value--;
  }
  restartAutoSlide()
};

const slideNext = () => {
  if (canSlideNext.value) {
    position.value++;
  }else{
    position.value =0
  }
  restartAutoSlide()
};

const numberButtons = computed(() => Math.max(1, collectImgs.length - itemImage + 1));


</script>

<template>
  <div class="relative w-full max-w-6xl mx-auto px-4 py-6  mr-12  ">
    <div class="relative overflow-hidden  ">
      <div class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${position * 33.333}%)` }">
       <div v-for="collectImg in collectImgs" :key="collectImg.id" class="w-1/3 flex-shrink-0 px-2">
          <div class="h-48 overflow-hidden rounded-xl">
            <img :src="collectImg.img" alt="Image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
    <button @click="slidePrev"
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 ml-4 shadow-md z-10"
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <button @click="slideNext"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 mr-4 shadow-md z-10"
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M9 5l7 7-7 7"></path>
      </svg>

    </button>

      <div class="flex justify-center mt-4">
      <button 
        v-for="index of numberButtons" 
        :key="index" 
        @click="position.value = index -1"
        class="mx-1 h-2 rounded-full transition-all duration-200"
        :class="[
          position === index ? 'bg-blue-600 w-4' : 'bg-gray-300 w-2',
        ]"
      ></button>
    </div>




  </div>
</template>