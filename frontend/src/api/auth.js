import api from "./axios";


export async function login(email,password){


const response = await api.post(
"/login",
{
email,
password
}
);


return response.data;


}



export async function logout(){

return api.post("/logout");

}