<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  totalAmount: { type: Number, default: 0 },
  bookingTime: { type: String, default: "Not Set" },
  selectedPromo: { type: Object, default: null }, 
});

const discount = computed(() => {
  if (!props.selectedPromo) return 0;
  return typeof props.selectedPromo === 'object' ? props.selectedPromo.discount : 0;
});

const finalAmount = computed(() => {
  const result = Math.max(props.totalAmount - discount.value, 0);
  return result;
});

</script>

<template>
  <div class="bg-white p-6 shadow-md w-full max-w-sm mx-auto sm:ml-10 sm:right-39 sm:top-29 sm:absolute rounded-xl">
    <div class="flex justify-between items-center">
      <h2 class="text-base sm:text-base font-bold text-gray-900">Total Amount</h2>
      <p class="text-blue-600 text-base font-semibold text-right">
        ฿ {{ finalAmount }}
      </p>
    </div>

    <div class="border-t border-gray-300 mt-3 pt-3">
      <p class="text-xs text-gray-500">
        {{ props.bookingTime }}
      </p>
      <p class="text-xs text-red-400 mt-2">
        Please note that the payment method cannot be changed once the transaction has been completed.
      </p>
    </div>

    <div class="bg-gray-100 p-4 mt-2">
      <div class="space-y-2 text-sm">
        <div class="flex justify-between text-gray-500">
          <span>Adults</span> <span>฿ {{ totalAmount }}</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Ticket fare</span> <span>฿ 0 × 1</span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Taxes & fees</span> <span>฿ 0 × 1</span>
        </div>
        <div class="flex justify-between">
          <span>Insurance</span> <span>฿ 0 × 1</span>
        </div>
        <div class="flex justify-between text-red-500">
          <span>Promo code</span> <span>- ฿ {{ discount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 640px) {
  .sm\\:ml-10 {
    margin-left: 0;
  }
  .sm\\:right-39 {
    right: 0;
  }
  .sm\\:top-29 {
    top: 0;
  }
  .sm\\:absolute {
    position: relative;
  }
}
</style>
