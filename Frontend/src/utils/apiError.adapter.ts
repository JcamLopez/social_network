
import { AxiosError } from 'axios';
import { AppError } from './AppError';


export interface BackendErrorResponse {
    message?: string;
    errors?: unknown;
}

export const handleApiError = <T = unknown>(error: unknown): AppError<T> => {

    if (error instanceof AxiosError) {
        console.dir(error)
        const responseData = error.response?.data as BackendErrorResponse | undefined;
        const message = responseData?.message || error.message || 'Error de comunicación con el servidor';
        const status = error.response?.status || 500;

        return new AppError<T>(message, status, responseData?.errors as T);
    }

    if (error instanceof Error) return new AppError<T>(error.message, 500);


    return new AppError('Ocurrió un error inesperado', 500)
};