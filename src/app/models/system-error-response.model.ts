export class SystemErrorResponse {
    message: string
    timestamp: number

    constructor(message: string,
        timestamp: number) {
        this.message = message
        this.timestamp = timestamp
    }
}