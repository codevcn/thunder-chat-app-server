import { TMessage } from '@/utils/entities/message.entity'

export interface IMessageService {
    findMessagesByConversationId: ({
        conversationId,
    }: {
        conversationId: number
    }) => Promise<TMessage[]>
}
