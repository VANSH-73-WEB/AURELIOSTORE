import axios from "axios";
import BASE_URL from "../config/api";



export const registerUser = async (data) => {
  
    const res = await axios.post(`${BASE_URL}/api/auth/register`, data); 
    return res.data;
};

   
export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, data);
  return res.data;
};