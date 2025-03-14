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
        throw new error("can't not get hotels")
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

async function getBooking(url) {
    try {
        const data = await fetch(url)
        const booking = await data.json()
        return booking ;
    }
    catch(error) {
        throw new error("can't not get hotels")
    }
}


async function getBookingById(url,id) {
    try {
        const data = await fetch(url,id)
        if(data.status === 404){
            return "Item not found"
        }
        const booking = await data.json()
        return booking;
    }
    catch (error){
        throw new error("can't not get hotels")
    }
}

export {getHotels, getHotelById,createBooking, getBookingById} 