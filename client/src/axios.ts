import axios from 'axios';

export const makeRequest = axios.create({
    // baseURL: "http://8.146.210.112:8889/api/",
    baseURL: "http://localhost:8800/api/",
    withCredentials: true
})