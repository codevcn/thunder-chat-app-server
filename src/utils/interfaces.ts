import {
    TCreateUser, TUser, TLoginUser,
    TJWTToken,
    TSearchConversation,
} from "./types"

export interface IUserService {
    createUser: (createUser: TCreateUser) => Promise<TUser>,
    getUserByEmail: (email: string) => Promise<TUser>,
}

export interface IAuthService {
    loginUser: (loginUser: TLoginUser) => Promise<TJWTToken>,
    registerUser: (createUserData: TCreateUser) => Promise<TJWTToken>,
}

export interface IConversations {
    searchConversation: ({ email, username, creatorId }: TSearchConversation) => Promise<TUser>,
}