import type {
    TStartConversationParams,
    TStartConversationReturn,
    TFindConversationParams,
    TFindConversationReturn,
    TSearchConversationParams,
} from './types'
import { TUser, TUserWithProfile } from '@/utils/entities/user.entity'
import { CreateConversationDTO, SearchConversationDTO } from './conversation.dto'

export interface IConversationsService {
    searchConversation: ({
        email,
        username,
        creatorId,
    }: TSearchConversationParams) => Promise<TUserWithProfile[]>
    startConversation: ({
        recipientId,
        creatorId,
    }: TStartConversationParams) => Promise<TStartConversationReturn>
    findConversation: ({
        recipientId,
        creatorId,
    }: TFindConversationParams) => Promise<TFindConversationReturn | null>
}

export interface IConversationsController {
    searchConversation: (
        user: TUser,
        searchConversationPayload: SearchConversationDTO
    ) => Promise<TUserWithProfile[]>
    startConversation: (
        user: TUser,
        createConversationPayload: CreateConversationDTO
    ) => Promise<TStartConversationReturn>
    fetchConversation: (conversationId: string) => Promise<TFindConversationReturn | null>
}
