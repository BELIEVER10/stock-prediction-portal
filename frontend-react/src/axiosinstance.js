import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstace = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',

    }

})

// Request Interceptor
axiosInstace.interceptors.request.use(
    function(config) {
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    }, function(error) {
        return Promise.reject(error)
    }
)

// Response Interceptor
axiosInstace.interceptors.response.use(
    function(response) {
        return response
    },
    // Handle failed responses
    async function(error) {
        const originalRequest = error.config
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true
            const refreshToken = localStorage.getItem("refreshToken")
            try{
                const response = await axiosInstace.post('/token/refresh/', {refresh: refreshToken})
                console.log("New access token:", response.data.access)
                localStorage.setItem("accessToken", response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstace(originalRequest)
    
            }catch(error) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstace