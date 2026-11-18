import { useState } from 'react'
import { authService } from '../services/auth.service'
import { handleApiError } from '../../../utils/apiError.adapter'
import type { User, RegisterPayload, ValidationErrors } from '../types/auth.types'
import type { ApiResponse } from '../../../types/response.types'

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<ValidationErrors | null>(null)
    const registerUser = async (data: RegisterPayload): Promise<ApiResponse<User> | null> => {
        setIsLoading(true)
        setError(null)
        setFieldErrors(null)
        try {
            const response = await authService.register(data)
            return response
        } catch (err) {
            const appError = handleApiError<ValidationErrors>(err)
            setError(appError.message)
            if (appError.details) setFieldErrors(appError.details)
        
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return { registerUser, isLoading, error, fieldErrors }
}