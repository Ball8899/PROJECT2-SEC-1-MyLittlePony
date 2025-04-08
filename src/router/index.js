import { createWebHistory, createRouter } from 'vue-router'
import FlightList from '../components/FlightList/FlightList.vue'
import FlightBookingForm from '../components/FlightList/FlightBookingForm.vue'
import HotelDetailPage from '../views/HotelDetailPage.vue'
import BookingHotels from '../views/BookingHotels.vue'
import PaymentForm from '../components/form/PaymentForm.vue'
import TotalAmount from '../components/BookDetail/TotalAmount.vue'
import BookingDetail from '@/components/BookDetail/BookingDetail.vue'
import flightBookedContent from "../components/flightBookedContent.vue"
import ListHotelSearch from '../components/Hotels/ListHotelSearch.vue'
import BookingHotelDetail from '@/components/BookDetail/BookingHotelDetail.vue'
import HotelBookedContent from '@/components/Hotels/HotelBookedContent.vue'
import FlightListAdmin from '@/components/admin/FlightListAdmin.vue'
import Login from '@/components/admin/Login.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import Home from '@/views/Home.vue'
import FlightBookedPage from '@/components/flightBookedPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
      path: "/list-flight",
      name: "listFlight",
      component: FlightList,
      meta: { title: "เลือกเส้นทางของคุณ" },
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
      component: FlightBookedPage,
    },
    {
      path: "/pageHotelList",
      name: "pageHotelList",
      component: ListHotelSearch,
    },
    {
      path: "/BookingHotelDetail/:id",
      name: "BookingHotelDetail",
      component: BookingHotelDetail,
    },
    {
      path:"/HotelBookedContent",
      name: "HotelBookedContent",
      component:HotelBookedContent
    },
    {
      path: "/admin-panel",
      name: "AdminPanel",
      component: FlightListAdmin
    },
    {
      path: "/login",
      name: "/login",
      component: Login
    },
    {
    path: "/:catchAll(.*)",
    name: "notFound",
    redirect: "/page-not-found",
  },
  {
    path: "/page-not-found", 
    name: "PageNotFound",
    component: PageNotFound,
  },
  ],
});

router.beforeEach ((to, from, next) => {
  if (to.name === 'AdminPanel') {
    console.log ('Before navigating to AdminPanel');

    if (isUserAdmin ()) {
      next (); 
    } else {
      next ('/login'); 
    }
  } else {
    next (); 
  }
});


function isUserAdmin () {
  return localStorage.getItem('role') === 'admin';
}



router.beforeEach ((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Vite App'; 
  }
  next ();
});


export default router
