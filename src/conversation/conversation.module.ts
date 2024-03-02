import { ConversationController } from '@/conversation/conversation.controller'
import { ConversationService } from './conversation.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [],
    controllers: [ConversationController],
    providers: [ConversationService],
})
export class ConversationsModule {}
