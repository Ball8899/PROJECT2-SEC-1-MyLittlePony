import { createWebHistory, createRouter } from 'vue-router'
import Booking from '../components/Booking.vue'
import FlightList from '../components/FlightList/FlightList.vue'
import FlightBookingForm from '../components/FlightList/FlightBookingForm.vue'
import HotelDetailPage from '../views/HotelDetailPage.vue'
import BookingHotels from '../views/BookingHotels.vue'
import PaymentForm from '../components/form/PaymentForm.vue'
import TotalAmount from '../components/BookDetail/TotalAmount.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/list-flight",
      name: "listFlight",
      component: FlightList,
    },
    {
      path: "/flight-booking-form/:flightId/:passenger",
      name: "flightBookingForm",
      component: FlightBookingForm,
    },
    {
      path: "/payment",
      name: "paymentForm",
      component: PaymentForm,
    },
    {
      path: "/hotelDetail/:hotelId",
      name: "hotelDetail",
      component: HotelDetailPage,
    },
    {
      path: "/BookingHotels/:roomId/:hotelId/:optionId",
      name: "BookingHotels",
      component: BookingHotels,
    },
    {
      path: "/TotalAmount",
      name: "TotalAmount",
      component: TotalAmount,
    },
  ],
});

export default router
