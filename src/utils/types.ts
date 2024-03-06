import type { Request } from 'express'
import { EClientCookieNames } from './enums'
import type { TUser } from './entities/user.entity'

export type TRequestWithUser = Request & { user: TUser }

export type THttpErrorResBody = {
    name: string
    message: string
    trace: string
    timestamp: Date
    isUserException: boolean
}

export type TJWTToken = {
    jwt_token: string
}

export type TCustomExceptionPayload = {
    message: string
    name: string
    stack: string
    status: number
    isUserException: boolean
}

export type TClientCookie = Record<EClientCookieNames, string>

export type TSuccess = {
    /**
     * Always true
     */
    success: boolean
}
