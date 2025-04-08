<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
    <div class="max-w-3xl w-full rounded-xl overflow-hidden shadow-xl border border-blue-200">
      <div class="bg-blue-600 py-4 px-6">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            <line x1="6" y1="16" x2="6.01" y2="16"></line>
            <line x1="10" y1="16" x2="10.01" y2="16"></line>
          </svg>
          <span class="ml-3 text-white font-bold text-xl">SkyWay Airlines</span>
        </div>
      </div>
      
      <div class="p-8 bg-white">
        <div class="flex flex-col md:flex-row items-center">
          <div class="relative mb-8 md:mb-0 md:mr-12">
            <div class="relative">
              <div class="text-9xl font-bold text-blue-100">404</div>
            
              <div class="absolute top-1/2 left-0 w-full">
                <div class="relative w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500 transform -rotate-12 absolute animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                  </svg>
                </div>
              </div>
              
              <div class="absolute top-1/2 left-0 w-full">
                <div class="w-full border-t-2 border-dashed border-blue-200"></div>
              </div>
            </div>
          </div>
          
          <div class="text-center md:text-left">
            <h1 class="text-3xl font-bold text-blue-700 mb-4">Destination Not Found</h1>
            <p class="text-lg text-blue-600 mb-2">We're sorry, but it seems this flight route doesn't exist.</p>
            <p class="text-md text-gray-600 mb-6">The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            
            <div class="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <div class="flex items-center justify-between text-sm text-blue-800 mb-2 font-mono">
                <span>STATUS</span>
                <span class="px-2 py-1 bg-red-100 text-red-600 rounded font-bold">FLIGHT NOT FOUND</span>
              </div>
              <div class="flex items-center justify-between text-sm text-blue-800 mb-2 font-mono">
                <span>FLIGHT</span>
                <span>SWA-404</span>
              </div>
              <div class="flex items-center justify-between text-sm text-blue-800 font-mono">
                <span>GATE</span>
                <span>--</span>
              </div>
            </div>
            
            <button @click="goHome" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Return to Home
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 py-3 px-6 border-t border-gray-200">
        <div class="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>Flight SWA-404 • Page Not Found</div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Local Time: {{ new Date().toLocaleTimeString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>