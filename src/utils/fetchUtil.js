async function getItems (url) {
  try {
    const response = await fetch (url);
    if (!response.ok) {
      throw new Error (`Error: ${response.statusText}`);
    }

    const finalData = await response.json ();
    return finalData;
  } catch (error) {
    console.error (error);
  }
}

async function getHotels(url) {
    try {
        const data = await fetch(url)
        const hotels = await data.json()
        return hotels
    }
    catch (error) {
        console.log("can't not get hotels")
    }
}

async function getHotelById(url,id) {
    try {
        const data = await fetch(`${url}/${id}`)
        if(data.status === 404){
            return "Item not found"
        }
        if (!data.ok) {
            throw new Error(`HTTP error! status: ${data.status}`);
        }
        const hotels = await data.json()
        return hotels
    }
    catch (error){
        console.error(`Error fetching hotel with ID ${id}:`, error);
        throw error;
    }
}

async function createBooking(url, Booking) {
    try {
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            'body': JSON.stringify({
                ...Booking
            })
        })
        const addBookingHotel = await response.json()
        return addBookingHotel;
    }
    catch (error) {
        throw new error("can't not get hotels")
    }
}

async function getItemById (url, id) {
  try {
    const response = await fetch (`${url}/${id}`);
    if (!response.ok) {
      throw new Error (`Error: ${response.statusText}`);
    }

    const finalData = await response.json ();
    return finalData;
  } catch (error) {
    console.error (error);
  }
}

async function postItem (url, data) {
  try {
    const response = await fetch (url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (data),
    });

    if (!response.ok) {
      throw new Error (`Error: ${response.statusText}`);
    }

    const finalData = await response.json (); 
    return finalData; 
  } catch (error) {
    console.error (error); 
  }
}

export {getItems, getItemById, postItem, getHotelById, getHotels, createBooking};
