import {
    TCreateUserParams,
    TUser,
    TLoginUserParams,
    TJWTToken,
    TSearchConversationParams,
    TUserWithProfile,
    TStartConversationParams,
    TStartConversationReturn,
    TFindConversationParams,
    TFindConversationReturn,
    TMessage,
} from "./types"

export interface IUserService {
    createUser: (createUser: TCreateUserParams) => Promise<TUser>,
    getUserByEmail: (email: string) => Promise<TUserWithProfile>,
}

export interface IAuthService {
    loginUser: (loginUser: TLoginUserParams) => Promise<TJWTToken>,
    registerUser: (createUserData: TCreateUserParams) => Promise<TJWTToken>,
}

export interface IConversationsService {
    searchConversation: ({ email, username, creatorId }: TSearchConversationParams) => Promise<TUserWithProfile[]>,
    startConversation: ({ recipientId, creatorId }: TStartConversationParams) => Promise<TStartConversationReturn>,
    findConversation: ({ recipientId, creatorId }: TFindConversationParams) => Promise<TFindConversationReturn>,
}

export interface IMessageService {
    findMessagesByConversationId: ({ conversationId }: { conversationId: number }) => Promise<TMessage[]>,
}