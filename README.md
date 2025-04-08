# PROJECT2-SEC-1-MyLittlePonyProject

#### Team Member MyLittlePony

| Student ID  | Full Name | Github User  | Task Load(%) |
|---|---|---|---|
| 66130500013   | Jakkapong Suksomboon   | Ball8899  |  25 |
| 66130500027 | Napat Chumtham   |  napatzzz |  25 |
| 66130500036  | Thattaphol Seelong   |  Turbo9922 | 25 |
| 66130500041  |  Thammasorn Chatchayanusorn  | Thammasornn |  25 |

#### Component Diagram
<img width="647" alt="image" src="https://github.com/user-attachments/assets/5f04de19-e3ca-4c49-871e-7e7498c8f4e7" />



#### What is we project 
- Web Application for booking flight and hotels in the world 

#### Future 
##### User Role
- Booking user can booking flight and hotels
- Display information for booking

##### Admin Role
- Manage flight information
- Manage Hotel information



#### Future And Responsible

##### 66130500013 Homes & Hotel Managements
- Can CURD Homes & Hotel information
- Create related components
- I worked on a hotel booking system with basic CRUD operations, focusing on GET, POST, and PUT requests. The process flow is as follows
 1. The user selects a hotel.
 2. The user chooses a room and proceeds to book it.
 3. On the booking page, the user is required to fill in their information, which includes input validation.
 4. After completing the booking, the user can navigate to view the hotel they just booked.
 5. On the list page showing all booked hotels, the user can either make a payment or cancel the booking.

##### 66130500027 Flight And Tours Managements
- Can CRUD  information
- Create related components of flight and Tour
- Manage All components
- Fetch function for display value

##### 66130500041 All flight booking information report
- Create related components of flightBookedPage(Details) and AppFilter and AppBookedMenu and HotelBookedPage(Without Details) and App Footer
- Fetch fucntion for display flightBookings and flightDetails value
- Can filter status of flightBooking by approveValue
- Can Click Delete flightBooking when approve value = Cancelled
- Can fetch function update approve value from cancelled to waiting
##### 66130500036 Flight booking information report
-  Create related components of BookingDetailPage and BookingHotelDetailPage and PaymentStatus and PromoCode and Rating and TotalAmount and  Advert and store booking.js
-  Can see approve, click to cancel, and when status is cancelled, click to rebook.
-  Can click to select a rating and provide feedback.
-  Can view booking details or price and other related information.
-  Can select and use a discount coupon (promo code).


### Weekly Progression

  | Student ID  | Week 1 | Week 2  | Week 3 | Week 4 | Week 5
|---|---|---|---|---|---|
| 66130500013   | Meeting & Design | Upload CardHotelList.vue , ListModelOfHotel.vue , CardModel.vue and Upload Hotel.json for test | create Fetch data of Hotels and fix Responsive|    add view-router and create BookingHotel , create List Room , add Hotels data to db.json| Upload Search hotel , and List Search Hotel ,and upload photo, the last update getHotelById in fetchUtils |
| 66130500027 | Meeting & Design  | Upload project and create homepage and component for booking |  update FlightList for display fights and update booking for send data to fetch for query flights | update fucntion process post flight booking to backend| update work flow for reserve ticket and validation data input from user and add function display ticket type round trip |
| 66130500036  | Meeting & Design |  Upload create componet BookingDetail,Likely,PaymentStatus,TotalAmount  |  Upload  BookDetail and add FligthDetail,function BookingDetail and Likely create component Advert   |   update function BookingDetail , PromoCode, TotalAmount,BookingHotelDetail | update store booking and feach BookingDetail,BookingHotelDeatail
| 66130500041  | Meeting & Design | Upload Component listHotel function to loop hotel details in file.json and hotelList for scoped slot hotel detail on All booking page  | Update List flight model(filterFlightBooked) Menu for Booked Page | re design BookedPage from week 3 and fetch flightBooking from db.json and get flight from flightBooking to fetch flightDetails add FooterComp | Add Delete flightBooking function and Help 013 do HotelBookedPage and help 036 add fetch function update approve from cancelled to waiting
