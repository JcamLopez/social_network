export class AppError extends Error {

    public readonly statusCode: number

    constructor(message: string, statusCode = 400, options?: ErrorOptions) {
        super(message, options)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, new.target.prototype)
    }

}