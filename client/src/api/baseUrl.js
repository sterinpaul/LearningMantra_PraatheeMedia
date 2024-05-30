import axios from 'axios'
import { BASE_URL } from './constants'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

const baseURL = axios.create({
    baseURL:BASE_URL
})

baseURL.interceptors.request.use(
    config=>{
        const token = localStorage.getItem("user-token")

        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }else{
            delete config.headers["Authorization"]
        }
        return config
    },
    error=>{
        console.log('Request Interceptor encounted an error')
        return Promise.reject(error)
    }
)


baseURL.interceptors.response.use(
    config=>{
        return config
    },
    error=>{
        const originalRequest = error.config;

        if(error.response.status == "403"){
            const navigate = useNavigate()
            localStorage.removeItem("user-token")
            toast.error(error.response.data.message)
            navigate("/")
        }

        // Check if the error is due to token expiration
        if (error.response.status == "401" && !originalRequest?._retry) {
          originalRequest._retry = true;

          const newToken = error.response.data.token
    
          localStorage.setItem('user-token',newToken);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axios(originalRequest);
        }
        return Promise.reject(error)
    }
)

export default baseURL