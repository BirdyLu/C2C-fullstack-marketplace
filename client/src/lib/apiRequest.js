import axios from "axios";

const api_request = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true, // send cookies along with the request
})

export default api_request