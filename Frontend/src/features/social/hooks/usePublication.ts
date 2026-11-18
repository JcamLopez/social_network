import { useState } from 'react'
import type { PublicationPayload } from '../types/publication.types'
import type { ApiResponse } from '../../../types/response.types'
import { publicacionService } from '../services/publication.service'
import { handleApiError } from '../../../utils/apiError.adapter'
export const useCretePublication = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const createPublication = async (data: PublicationPayload): Promise<ApiResponse<void> | null> => {
        setLoading(true)
        try {
            const response = await publicacionService.create(data)
            return response
        } catch (error) {
            const appError = handleApiError(error)
            setError(appError.message)
            return null
        } finally {
            setLoading(false)
        }

    }

    return { createPublication, isLoading, error }

}