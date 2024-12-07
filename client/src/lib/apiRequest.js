import axios from "axios";

const api_request = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true,
})

export default api_request