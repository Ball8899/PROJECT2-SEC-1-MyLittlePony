<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getItems } from "@/utils/fetchUtil";  

const username = ref("");
const password = ref("");
const router = useRouter(); 


const handleLogin = async () => {
  if (username.value && password.value) {
    alert(`ล็อกอินด้วยอีเมล: ${username.value}`);
    try {
      const account = await getItems(`${import.meta.env.VITE_APP_URL}/accounts?username=${username.value}&password=${password.value}`);
      localStorage.setItem('role', account[0].role);
      
      router.push({ name: "AdminPanel" });
    } catch (error) {
      console.error("Login failed:", error);
      alert("เกิดข้อผิดพลาดในการล็อกอิน");
    }
  } else {
    alert("กรุณากรอกอีเมลและรหัสผ่าน");
  }
};

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Login
        </button>
      </form>

      <div class="text-center mt-4">
        <p class="text-sm text-gray-600">
          Create new account here.
          <router-link to="/admin-panel" class="text-blue-500 hover:text-green-600">Signup</router-link>
        </p>
      </div>

      <div class="text-center mt-4">
        <button @click="goBack" class="text-sm text-gray-600 hover:text-gray-800">Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
