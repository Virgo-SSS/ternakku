import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://ternakku-backend.vercel.app';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-type': 'application/json'
    },
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true // This is to make sure that the cookie is sent to the server
})