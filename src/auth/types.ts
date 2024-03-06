import type { CookieOptions, Response } from 'express'

export type TLoginUserParams = {
    email: string
    password: string
}

export type TJWTPayload = {
    user_id: number
    email: string
}

export type TSendJWTParams = {
    response: Response
    token: string
    cookie_otps?: CookieOptions
}

export type TRemoveJWTParams = {
    response: Response
    cookie_otps?: CookieOptions
}
