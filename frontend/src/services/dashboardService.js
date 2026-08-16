import api from "../api/axios";


export async function getDashboard(){

    const response = await api.get(
        "/dashboard"
    );


    console.log(
        "DASHBOARD DATA:",
        response.data
    );


    return response.data;

}