import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://chatapp-76m3.onrender.com/api'
})