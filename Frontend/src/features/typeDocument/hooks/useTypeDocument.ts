import { useState } from 'react'
import { DocType } from '../services/typeDcoument.service'
import type { ApiResponse } from '../../../types/response.types'
import type { TypeDocument } from '../types/document.types'
import { handleApiError } from '../../../utils/apiError.adapter'

 
export const useGetTypeDocumnet = () => {

    const [isLoading, setLolading] = useState<boolean>(true)
    const [isError, setError] = useState<string | null>(null)
    const getTypeDocument = async (): Promise<ApiResponse<TypeDocument[]> | null> => {
        setLolading(false)
        try {
            const response = await DocType.getTypeDocument()
            return response
        } catch (error) {
            const appError = handleApiError(error)
            setError(appError.message)
            return null
        } finally {
            setLolading(true)
        }
    }

    return { isLoading, isError, getTypeDocument }
}