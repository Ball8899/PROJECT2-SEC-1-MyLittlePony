import { createWebHistory, createRouter } from 'vue-router'
import Booking from '../components/Booking.vue'
import FlightList from '../components/FlightList/FlightList.vue'
import FlightBookingForm from '../components/FlightList/FlightBookingForm.vue'
import HotelDetailPage from '../views/HotelDetailPage.vue'
import BookingHotels from '../views/BookingHotels.vue'
import PaymentForm from '../components/form/PaymentForm.vue'
import TotalAmount from '../components/BookDetail/TotalAmount.vue'
import BookingDetail from '@/components/BookDetail/BookingDetail.vue'
import flightBookedContent from "../components/flightBookedContent.vue"
import ListHotelSearch from '../components/Hotels/ListHotelSearch.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/list-flight",
      name: "listFlight",
      component: FlightList,
      meta: { title: 'เลือกเส้นทางของคุณ' }
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
    {
      path: "/BookingDetail/:id",
      name: "BookingDetail",
      component: BookingDetail,
    },
    {
      path: "/flightBookedContent",
      name: "flightBookedContent",
      component: flightBookedContent,
    },
    {
      path:'/pageHotelList',
      name:'pageHotelList',
      component:ListHotelSearch
    }
  ],
});

router.beforeEach ((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Vite App'; 
  }
  next ();
});


export default router
