import { api } from '../../../config/axios.config'
import type { ApiResponse } from '../../../types/response.types'
import type { TypeDocument } from '../types/document.types'

export const DocType = {
    getTypeDocument: async (): Promise<ApiResponse<TypeDocument[]>> => {
        const response = await api.get<ApiResponse<TypeDocument[]>>('type/document')
        return response.data
    }
}