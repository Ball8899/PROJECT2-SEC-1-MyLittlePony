<script setup>
import { ref, defineProps, defineEmits ,computed} from "vue";
import { useRouter,useRoute } from "vue-router";

const props = defineProps({
  promoCodes: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();
const showPromoCodeModal = ref(false);

const emits = defineEmits(["closeAllModals", "applyDiscount"]);


const currentDiscount = computed(() => Number(route.query.discount) || 0);
const cancelPromoCode = () => {
  router.push({ query: { discount: undefined } });
};


const togglePromoCodeModal = () => {
  emits("closeAllModals");
  showPromoCodeModal.value = true;
};

const closeAllModals = () => {
  emits("closeAllModals");
  showPromoCodeModal.value = false;
};

const applyPromoCode = (discount) => {
  router.push({ path:'/TotalAmount', query: { discount } }); 
  closeAllModals();
};

</script>


<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 ">
      <button @click="togglePromoCodeModal"
        class="flex items-center justify-between w-full p-4 sm:p-4 border transition text-black bg-gray-100 hover:border-blue-500 hover:bg-blue-100">
        <div class="flex items-center space-x-2">
          <i class="fa-solid fa-ticket"></i>
          <span class="font-semibold text-xs sm:text-sm">Promo Code</span>
        </div>
        <span class="text-gray-500">›</span>
      </button>
    </div>


    <div v-if="showPromoCodeModal" @click.self="closeAllModals"
      class="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl">
        <div class="flex justify-between items-center">
          <h2 class="text-base sm:text-lg font-bold text-gray-900">Promo Codes</h2>
          <button @click="closeAllModals" class="text-gray-500 hover:text-gray-800 text-xl">✖</button>
        </div>

        <div class="mt-8 sm:mt-16 space-y-3 sm:space-y-4">


          <div v-for="promo in props.promoCodes" :key="promo.id"
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-5 border cursor-pointer">
            <div class="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <i :class="promo.icon" class="text-gray-600 text-lg sm:text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-700 text-xs sm:text-sm">{{ promo.description }}</p>
                <a href="#" class="text-blue-600 text-xs sm:text-sm underline">Terms & Conditions</a>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="applyPromoCode(promo.discount)"
              class="px-3 sm:px-4 py-1 bg-blue-500 text-white rounded-lg text-xs sm:text-sm mt-2 sm:mt-0 transition hover:bg-blue-700">
              Apply
            </button>
             <button v-if="currentDiscount === promo.discount" @click="cancelPromoCode"
                class="px-3 sm:px-4 py-1 bg-red-500 text-white rounded-lg text-xs sm:text-sm transition hover:bg-red-600">
                Cancel
              </button>

            </div>
          </div>



        </div>
      </div>
    </div>
  </div>

</template>
