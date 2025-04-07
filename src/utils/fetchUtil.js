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

async function getHotelById(url, id) {
  try {
      if (!Array.isArray(id)) {
          const response = await fetch(`${url}/${id}`);
          if (response.status === 404) {
              console.warn(`Hotel ID ${id} not found`);
              return [];
    
          }
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
      } else {
          const response = await fetch(url);
          if (!response.ok) {
              console.warn("Hotel list not found");
              return [];
          }
          const data = await response.json();
          if (!Array.isArray(data)) {
              console.error("Data is not an array:", data);
              return [];
          }
          return data.filter(hotel => id.includes(hotel.id));
      }
  } catch (error) {
      console.error("Error fetching hotels:", error);
      return [];
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

async function deleteItemById(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    return res.status
  } catch (error) {
    throw new Error('can not delete your item')
  }
}

async function updateItem(url, id, updatedData) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
}

export {
  getItems,
  getItemById,
  postItem,
  getHotelById,
  getHotels,
  createBooking,
  deleteItemById,
  updateItem,
};
