import axios from 'axios'
import {env} from './env.config'
export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})