import api from "../api/axios";


export async function getBookings(){

    const response = await api.get("/bookings");

    console.log("API BOOKING RESPONSE:", response.data);

    return response.data.data;

}

export async function createBooking(data){

const response = await api.post(
"/bookings",
data
);


return response.data.data;

}

export async function getPendingBookings(){

const response =
await api.get(
"/bookings/pending"
);


return response.data.data;

}