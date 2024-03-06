import { User } from '@/user/user.decorator'
import { CreateConversationDTO, SearchConversationDTO } from '@/conversation/conversation.dto'
import { AuthGuard } from '@/auth/auth.guard'
import { ConversationService } from '@/conversation/conversation.service'
import type { TUser } from '@/utils/entities/user.entity'
import { BadRequestException, Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common'
import { ERoutes } from '@/utils/enums'
import { convertStringToNumber } from '@/utils/helpers'
import { IConversationsController } from './interfaces'

@Controller(ERoutes.CONVERSATIONS)
@UseGuards(AuthGuard)
export class ConversationController implements IConversationsController {
    constructor(private conversationService: ConversationService) {}

    @Post('search')
    async searchConversation(
        @User() user: TUser,
        @Body() searchConversationPayload: SearchConversationDTO
    ) {
        const { email, username, nameOfUser } = searchConversationPayload
        if (!email && !username && !nameOfUser) {
            throw new BadRequestException('Query is missing email and username and name')
        }
        return await this.conversationService.searchConversation({
            email: email,
            username: username,
            creatorId: user.id,
            nameOfUser: nameOfUser,
        })
    }

    @Post('start')
    async startConversation(
        @User() user: TUser,
        @Body() createConversationPayload: CreateConversationDTO
    ) {
        const { recipientId } = createConversationPayload
        return await this.conversationService.startConversation({
            creatorId: user.id,
            recipientId,
        })
    }

    @Get('fetch/:conversationId')
    async fetchConversation(@Param('conversationId') conversationId: string) {
        return await this.conversationService.findConversationById(
            convertStringToNumber(conversationId, 10)
        )
    }
}
