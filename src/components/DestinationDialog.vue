<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { getItems } from "@/utils/fetchUtil";

const props = defineProps({
    type: {
      type: String,
      require: true,
    },
});

const emit = defineEmits(["destination-selected"]);

const destinations = ref([]);
const selected = ref(localStorage.getItem("") || "");

async function fetchContents() {
  try {
    destinations.value = await getItems(
      `${import.meta.env.VITE_APP_URL}/continents`
    );
  } catch (error) {
    console.error(error);
  }
}

fetchContents();

watch(selected, (newDestination) => {
  emit("destination-selected", {
    type: props.type,
    value: newDestination,
  });
  localStorage.setItem("selected", newDestination);
});
</script>

<template>
  <div
  
    class="font-xs bg-white max-h-[600px] text-gray-500 w-[40%] overflow-auto"
  >
    <div
      class="p-5 mb-1.5"
      v-for="(continent, index) in destinations"
      :key="continent.id"
    >
      <div
        v-for="(country, countryIndex) in continent.countries"
        :key="country.id"
        class="mt-2"
      >
        <div class="text-sm py-1">{{ country.countryName }}</div>
        <div class="grid grid-cols-3">
          <button
            v-for="(province, provinceIndex) in country.provinces"
            :key="provinceIndex"
            @click.="selected = province"
            class="text-black font-light flex justify-start items-start text-sm py-2.5 px-1 hover:bg-blue-100 rounded-sm transition"
          >
            {{ province }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
