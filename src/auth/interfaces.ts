import {
    TLoginUserParams,
    TJWTToken,
    TJWTPayload,
    TSendJWTParams,
    TRemoveJWTParams,
} from '@/utils/types'
import type { CookieOptions } from 'express'

export interface IAuthService {
    loginUser: (loginUser: TLoginUserParams) => Promise<TJWTToken>
}

export interface IJWTService {
    getJWTcookieOtps: () => CookieOptions
    createJWT: (payload: TJWTPayload) => Promise<TJWTToken>
    sendJWT: (payload: TSendJWTParams) => void
    removeJWT: (payload: TRemoveJWTParams) => void
}
