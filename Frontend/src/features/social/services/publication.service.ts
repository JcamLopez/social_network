import type { PublicationPayload } from '../types/publication.types'
import type { ApiResponse } from '../../../types/response.types'
import { api } from '../../../config/axios.config'
export const publicacionService = {

    create: async (data: PublicationPayload): Promise<ApiResponse<void>> => {
        const response = await api.post<ApiResponse<void>>('/auth/publication', data)
        return response.data
    }

}