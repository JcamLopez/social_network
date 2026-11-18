import { useState } from 'react'
import { authService } from '../services/auth.service'
import type { LoginPayload,User } from '../types/auth.types'
import type {ApiResponse} from '../../../types/response.types'
import { handleApiError } from '../../../utils/apiError.adapter'
export const useLogin = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setError] = useState<string | null>(null)

    const login = async (data: LoginPayload): Promise<ApiResponse<User> | null> => {
        setLoading(true)
        setError(null)
        try {
            const response = await authService.login(data)
            return response
        } catch (error) {
            const appError = handleApiError(error)
            setError(appError.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { login, isLoading, isError }
}