import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://impactmindz.in/client/artie/bravo/back_end/api',
    // API_VERSION: "/api",
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance