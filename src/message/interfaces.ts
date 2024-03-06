import { TMessage } from '@/utils/entities/message.entity'

export interface IMessageService {
    findMessagesByConversationId: ({
        conversationId,
    }: {
        conversationId: number
    }) => Promise<TMessage[]>
}

export interface IMessageController {
    fetchMessages: (conversationId: string) => Promise<TMessage[]>
}
