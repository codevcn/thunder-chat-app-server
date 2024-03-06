import { ConversationController } from '@/conversation/conversation.controller'
import { ConversationService } from './conversation.service'
import { Module } from '@nestjs/common'
import { JWTService } from '@/auth/jwt.service'
import { UserService } from '@/user/user.service'
import { CredentialService } from '@/auth/credential.service'

@Module({
    imports: [],
    controllers: [ConversationController],
    providers: [ConversationService, JWTService, UserService, CredentialService],
})
export class ConversationsModule {}
