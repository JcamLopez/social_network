export class AppError<T = unknown> extends Error {
    public readonly statusCode: number;
    public readonly details?: T;

    constructor(message: string, statusCode: number = 500, details?: T) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.details = details;
    }
}