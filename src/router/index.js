import { createWebHistory, createRouter } from 'vue-router'
import FlightList from '../components/FlightList/FlightList.vue'
import FlightBookingForm from '../components/FlightList/FlightBookingForm.vue'
import HotelDetailPage from '../views/HotelDetailPage.vue'
import BookingHotels from '../views/BookingHotelPage.vue'
import PaymentForm from '../components/form/PaymentForm.vue'
import TotalAmount from '../components/BookDetail/TotalAmount.vue'
import BookingDetail from '@/components/BookDetail/BookingDetailPage.vue'
import ListHotelSearch from '../components/Hotels/ListHotelPage.vue'
import BookingHotelDetail from '@/components/BookDetail/BookingHotelDetailPage.vue'
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
    component: Home,
    meta: { title: "Home" }
    },
    {
      path: "/list-flight",
      name: "listFlight",
      component: FlightList,
      meta: { title: "Fight" },
    },
    {
      path: "/flight-booking-form/:flightId/:passenger",
      name: "flightBookingForm",
      component: FlightBookingForm,
      meta: { title: "Flight Booking" },
    },
    {
      path: "/payment",
      name: "paymentForm",
      component: PaymentForm,
      meta: { title: "Payment" },
    },
    {
      path: "/hotelDetail/:hotelId",
      name: "hotelDetail",
      component: HotelDetailPage,
      meta: { title: "Hotel Detail" },
    },
    {
      path: "/BookingHotels/:roomId/:hotelId/:optionId",
      name: "BookingHotels",
      component: BookingHotels,
      meta: { title: "Booking Hotel" },
    },
    {
      path: "/TotalAmount",
      name: "TotalAmount",
      component: TotalAmount,
      meta: { title: "Total Amount" },
    },
    {
      path: "/BookingDetail/:id",
      name: "BookingDetail",
      component: BookingDetail,
      meta: { title: "Booking Flight Detail " },
    },
    {
      path: "/flightBookedContent",
      name: "flightBookedContent",
      component: FlightBookedPage,
      meta: { title: "Flight Booked" },
    },
    {
      path: "/pageHotelList",
      name: "pageHotelList",
      component: ListHotelSearch,
      meta: { title: "Hotel" },
    },
    {
      path: "/BookingHotelDetail/:id",
      name: "BookingHotelDetail",
      component: BookingHotelDetail,
      meta: { title: "Booking Hotel Detail" },
    },
    {
      path:"/HotelBookedContent",
      name: "HotelBookedContent",
      component:HotelBookedContent,
      meta: { title: "Hotel Booked" },
    },
    {
      path: "/admin-panel",
      name: "AdminPanel",
      component: FlightListAdmin,
      meta: { title: "Admin" },
    },
    {
      path: "/login",
      name: "/login",
      component: Login,
      meta: { title: "Login" },
    },
    {
    path: "/:catchAll(.*)",
    name: "notFound",
    redirect: "/page-not-found",
    meta: { title: "notFound" },
  },
  {
    path: "/page-not-found", 
    name: "PageNotFound",
    component: PageNotFound,
    meta: { title: "Page Not Found" },
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
