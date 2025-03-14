<script setup></script>

<template>
  <div class="bg-white p-6 shadow-md w-full max-w-sm ml-220 absolute ">
    <div class="flex justify-between items-center">
      <h2 class="text-base sm:text-base font-bold text-gray-900">Total Amount</h2>
      <p class="text-blue-600 text-base font-semibold text-right">
        <slot name="total-amount">฿ 3,259.00</slot>
      </p>
    </div>

    <div class="border-t border-gray-300 mt-3 pt-3">
      <div class="flex justify-between items-center mt-2">
        <h2 class="text-base font-bold text-gray-900 ">Booking Total</h2>
        <p class="text-sm sm:text-sm font-bold text-gray-900 text-right">
          <slot name="booking-total">฿ 3,259.00</slot>
        </p>
      </div>
      <p class="text-xs text-gray-500">
        <slot name="booking-time">17:26, March 8, 2025</slot>
      </p>
      <p class="text-xs text-red-400 mt-2">
        <slot name="warning">
          Please note that the payment method cannot be changed once the
          transaction has been completed
        </slot>
      </p>
    </div>
    <div class="bg-gray-100 p-4 mt-2">
      <slot name="details">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Adults</span>
          <span>฿ 2,960.00 × 1</span>
        </div>
        <div class="flex justify-between text-sm mt-2 text-gray-400">
          <span>Ticket fare</span>
          <span>฿ 1,800.00 × 1</span>
        </div>
        <div class="flex justify-between text-sm mt-2 text-gray-400">
          <span>Taxes & fees</span>
          <span>฿ 1,160.00 × 1</span>
        </div>
        <div class="flex justify-between text-sm mt-3">
          <span>Insurance</span>
          <span>฿ 299.00 × 1</span>
        </div>
        <div class="flex justify-between text-sm mt-3">
          <span>Promo code</span>
          <span>฿ 0.00 × 2</span>
        </div>
      </slot>
    </div>
  </div>
</template>
