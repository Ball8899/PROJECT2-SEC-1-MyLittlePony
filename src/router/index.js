import { createWebHistory, createRouter } from 'vue-router'
import Booking from '../components/Booking.vue'
import FlightList from '../components/FlightList/FlightList.vue'
import FlightBookingForm from '../components/FlightList/FlightBookingForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list-flight',
      name: 'listFlight',
      component: FlightList
    },
    {
      path: '/flight-booking-form',
      name: 'flightBookingForm',
      component: FlightBookingForm
    }
    
  ],
})

export default router
