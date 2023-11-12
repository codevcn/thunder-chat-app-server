import { Request } from 'express'
import {
    User,
    Profile,
    Conversation,
    Message,
} from '@prisma/client'

export type TUser = User

export type TProfile = Profile

export type TUserWithProfile = TUser & { Profile: Omit<TProfile, 'id' | 'userId'> }

export type TConversation = Conversation

export type TMessage = Message

export type TRequestWithUser = Request & { user: TUser }

export type TCreateUserParams = {
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

export type TLoginUserParams = {
    email: string,
    password: string,
}

export type TJwtPayload = {
    user_id: number,
    email: string,
}

export type TSearchConversationParams = {
    email?: string,
    username?: string,
    creatorId: number,
    nameOfUser?: string,
}

export type TStartConversationParams = {
    recipientId: number,
    creatorId: number,
}

export type TFindConversationParams = TStartConversationParams

export type TStartConversationReturn =
    TConversation & {
        recipient: TUserWithProfile,
    }

export type TFindConversationReturn = TStartConversationReturn