import type {
    TStartConversationParams,
    TStartConversationReturn,
    TFindConversationParams,
    TFindConversationReturn,
    TSearchConversationParams,
} from '@/utils/types'
import { TUserWithProfile } from '@/utils/entities/user.entity'

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
