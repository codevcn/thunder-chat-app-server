import type { CookieOptions, Request, Response } from 'express'
import { EClientCookieNames } from './enums'
import type { TUser, TUserWithProfile } from './entities/user.entity'
import type { TConversation } from './entities/conversation.entity'

export type TRequestWithUser = Request & { user: TUser }

export type TCreateUserParams = {
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: Date
}

export type THttpErrorResBody = {
    name: string
    message: string
    trace: string
    timestamp: Date
    isUserException: boolean
}

export type TException = {
    status: number
    name: string
    stack: string
    isUserException: boolean
    message: string
}

export type TJWTToken = {
    jwt_token: string
}

export type TLoginUserParams = {
    email: string
    password: string
}

export type TJWTPayload = {
    user_id: number
    email: string
}

export type TSearchConversationParams = {
    email?: string
    username?: string
    creatorId: number
    nameOfUser?: string
}

export type TStartConversationParams = {
    recipientId: number
    creatorId: number
}

export type TFindConversationParams = TStartConversationParams

export type TStartConversationReturn = TConversation & {
    recipient: TUserWithProfile
}

export type TFindConversationReturn = TStartConversationReturn

export type TSendJWTParams = {
    res: Response
    token: string
    cookie_otps?: CookieOptions
}

export type TRemoveJWTParams = {
    res: Response
    cookie_otps?: CookieOptions
}

export type TCustomExceptionPayload = {
    message: string
    name: string
    stack: string
    status: number
    isUserException: boolean
}

export type TClientCookie = Record<EClientCookieNames, string>

export type NodeEnvironments = 'development' | 'production'
