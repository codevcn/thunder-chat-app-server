import { TLoginUserParams, TJWTPayload, TSendJWTParams, TRemoveJWTParams } from './types'
import type { TJWTToken, TSuccess } from '@/utils/types'
import type { CookieOptions, Response } from 'express'
import { LoginUserDTO } from './auth.dto'
import { TUser } from '@/utils/entities/user.entity'
import { CheckAuthEntity } from './auth.serialization'

export interface IAuthController {
    login: (loginUserPayload: LoginUserDTO, res: Response) => Promise<TSuccess>
    logout: (res: Response) => Promise<TSuccess>
    authUser: (user: TUser) => Promise<CheckAuthEntity>
}

export interface IAuthService {
    loginUser: (res: Response, loginUser: TLoginUserParams) => void
    logoutUser: (res: Response) => void
    authUser: (user: TUser) => CheckAuthEntity
}

export interface IJWTService {
    getJWTcookieOtps: () => CookieOptions
    createJWT: (payload: TJWTPayload) => Promise<TJWTToken>
    sendJWT: (payload: TSendJWTParams) => void
    removeJWT: (payload: TRemoveJWTParams) => void
    verifyToken: (token: string) => Promise<TJWTPayload>
}

export interface ICredentialService {
    compareHashedPassword: (password: string, encrypted: string) => Promise<boolean>
    getHashedPassword: (password: string) => Promise<string>
}
