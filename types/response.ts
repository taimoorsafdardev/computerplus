export type ResponseType<T = unknown, K = unknown> = {
    data?: T
    message: string
    success: boolean
    error?: Error
}