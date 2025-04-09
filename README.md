# PROJECT2-SEC-1-MyLittlePonyProject

#### Team Member MyLittlePony

| Student ID  | Full Name | Github User  | Task Load(%) |
|---|---|---|---|
| 66130500013   | Jakkapong Suksomboon   | Ball8899  |  25 |
| 66130500027 | Napat Chumtham   |  napatzzz |  25 |
| 66130500036  | Thattaphol Seelong   |  Turbo9922 | 25 |
| 66130500041  |  Thammasorn Chatchayanusorn  | Thammasornn |  25 |

### Component Diagram
<img width="805" alt="image" src="https://github.com/user-attachments/assets/e300c32d-b65d-4692-8b38-29796aaa3750" />




## Video Demonstrate use
https://drive.google.com/file/d/1Z7isxS0e-VIUngj1aaGXfcWzL3UyXumK/view?usp=share_link

#### Text Manual คู่มือการใช้งาน
##### Admin Panel
###### Login
- Press signup or register button then login by username: jetdotgo and password: jetdotgopasswd
- Press login button
- If login successfully will redirect to FlightListAdmin for manange flights in system
###### FlightListAdmin
- You can filter flight booked approve(status) by click Waiting Cancelled
- Can delete the flight booked when approve is cancelled
- Can click the booked to go to booked details page

##### Booking Flight
###### Search flights
- Select type of flight
- Select leaving city
- Select going city
- Select date to departure and select date to return if type of flgiht is round trip
- Select count of passenger must be more than 0 and less then ten
- Then press button search
###### Select flight
- Select flight and selection option (weight of baggage and options)
- Input information for travelers, contact value
- Next press payment button, is finish yet booking flight.


#### Booking Hotels
###### Search Your Hotels
- Select Province
- Select Price Range
- Select Capacity
- Press  button search 
###### Hotels Detail
- You will see the hotel and room details
- Select the room you want by clicking "Reserve"
###### Booking Hotel
- Select your first name
- Select your last name
- Select your email
- Select your phone
- Select your number of nights (default 1)
- Select your number of rooms  (default 1)
- Select your Special Requests (Optional)
- Press complete Booking
- Once the booking is complete, you can click to close, or if you want to view the list of your booked hotels, click 'Your Booked'.
###### List Booked Hotels
- You can view the list of booked hotels
  

#### BookingDetail
###### BookingDetailPage
- Can see approval status, click to cancel the booking, and if the status is "Cancelled", you can click to rebook.
- Can click to select a rating and provide feedback.
- Can click to view flight details, including departure and return times, prices, and your booking information.
- Can select and apply a discount coupon (promo code) for the flight.
###### BookingHotelDetailPage
- Can see approval status, click to cancel the booking, and if the status is "Cancelled", you can click to rebook.
- Can click to view hotel details including booking information, booking price, name, email, and phone number used for the reservation.
- Can select and apply a discount coupon (promo code) for the flight.
- Can click to select a rating and provide feedback.





#### What is we project 
- Web Application for booking flight and hotels in the world 

#### Future 
##### User Role
- Booking user can booking flight and hotels
- Display information for booking

##### Admin Role
- Manage flight information



#### Future And Responsible

##### 66130500013 Homes & Hotel Managements
- Hotel List use  http method get  all hotels from backend
- Hotel Booking use http method post
- Hotel delete Booked use http method delete
- Create Card Hotel List
- Create Search hotel
- Create Hotel Detail
- Create Booking Hotel
- Create List Booked Hotel

##### 66130500027 Flight And Admin Managements
- FLight list use http method get for hook all flight from backend
- Flight booking use http method post
- Create flight store by pinia for state managements
- Create related component for workflow booking ticket flight
- Create Admin Panel for set status available or not available flight for user use http method put for update status for each flight
- Create function login logout
- Create components CalendarDialog, DestinationDialog for reuse in each booking such hotel booking.


##### 66130500041 All flight booking information report
- Create related components of flightBookedPage(Details) and AppFilter and AppBookedMenu and HotelBookedPage(Without Details) and App Footer
- Fetch fucntion for display flightBookings and flightDetails value
- Can filter status of flightBooking by approveValue
- Can Click Delete flightBooking when approve value = Cancelled
- Can fetch function update approve value from cancelled to waiting
- 
##### 66130500036 Flight booking information report
- Can CURD 


### Weekly Progression

  | Student ID  | Week 1 | Week 2  | Week 3 | Week 4 | Week 5
|---|---|---|---|---|---|
| 66130500013   | Meeting & Design | Upload CardHotelList.vue , ListModelOfHotel.vue , CardModel.vue and Upload Hotel.json for test | create Fetch data of Hotels and fix Responsive|    add view-router and create BookingHotel , create List Room , add Hotels data to db.json| Upload Search hotel , and List Search Hotel ,and upload photo, the last update getHotelById in fetchUtils |
| 66130500027 | Meeting & Design  | Upload project and create homepage and component for booking |  update FlightList for display fights and update booking for send data to fetch for query flights | update fucntion process post flight booking to backend| update work flow for reserve ticket and validation data input from user and add function display ticket type round trip |
| 66130500036  | Meeting & Design |  Upload create componet BookingDetail,Likely,PaymentStatus,TotalAmount  |  Upload  BookDetail and add FligthDetail,function BookingDetail and Likely create component Advert   |   update function BookingDetail , PromoCode, TotalAmount,BookingHotelDetail | update store booking and feach BookingDetail,BookingHotelDeatail
| 66130500041  | Meeting & Design | Upload Component listHotel function to loop hotel details in file.json and hotelList for scoped slot hotel detail on All booking page  | Update List flight model(filterFlightBooked) Menu for Booked Page | re design BookedPage from week 3 and fetch flightBooking from db.json and get flight from flightBooking to fetch flightDetails add FooterComp | Add Delete flightBooking function and Help 013 do HotelBookedPage and help 036 add fetch function update approve from cancelled to waiting


### Inspiration
Inspiration trip.com because it’s a platform that makes trip planning easier with comprehensive information on tourist attractions, accommodations, and flights all in one place. Plus, it offers real traveler reviews to help you decide with confidence. Whether it’s a short getaway or a long adventure, it caters to every travel style!
https://th.trip.com/

