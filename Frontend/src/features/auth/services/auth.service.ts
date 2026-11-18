import { api } from '../../../config/axios.config'
import type { User, RegisterPayload, LoginPayload } from '../types/auth.types'
import type { ApiResponse } from '../../../types/response.types'

export const authService = {
    register: async (data: RegisterPayload): Promise<ApiResponse<User>> => {
        const response = await api.post<ApiResponse<User>>('/auth/register', data)
        return response.data
    },
    login: async (data: LoginPayload): Promise<ApiResponse<User>> => {
        const response = await api.post<ApiResponse<User>>('/auth/login', data)
        return response.data
    },

    


}