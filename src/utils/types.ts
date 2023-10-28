import { Prisma } from 'prisma/prisma-client'
import { Request } from 'express'

const tuser = Prisma.validator<Prisma.UserDefaultArgs>()({})
export type TUser = Prisma.UserGetPayload<typeof tuser>

export type TRequestWithUser = Request & { user: TUser }

export type TCreateUser = {
    email: string
    password: string
    firstName: string
    lastName: string
    birthday: Date
}

export type THttpErrorResBody = {
    name: string,
    message: string,
    trace: string,
    timestamp: Date,
    isUserException: boolean,
}

export type TException = {
    status: number,
    name: string,
    stack: string,
    isUserException: boolean,
    message: string,
}

export type TJWTToken = {
    jwt_token: string,
}

export type TLoginUser = {
    email: string,
    password: string,
}

export type TJwtPayload = {
    user_id: number,
    email: string,
}

export type TSearchConversation = {
    email?: string,
    username?: string,
    creatorId: number, 
}