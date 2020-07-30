import axios from 'axios';

const api = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
})

const apiKey = "AIzaSyC43Dyf_JTS7doJKO9rPEqMRZzkzWI_hIo";

export default api;
export { apiKey };