import axios from 'axios'
import { BASE_URL } from './apiPaths.js'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// axiosInstance.interceptors.request.use(

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token')
    console.log('Token gửi đi nè sếp:', accessToken) // Thêm dòng này
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    // Handle common error scenarios
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized, token might be invalid or expired
        window.location.href = '/login'
      } else if (error.response.status === 500) {
        console.error('Server Error.Please try again later.')
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout. Please try again later.')
    } else {
      console.error('An unexpected error occurred.')
    }
    return Promise.reject(error)
  }
)

//
export default axiosInstance
