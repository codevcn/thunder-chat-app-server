import { User } from '@/decorators/user.decorator'
import { CreateConversationDTO, SearchConversationDTO } from '@/dtos/conversation'
import { AuthGuard } from '@/guards/auth.guard'
import { ConversationsService } from '@/services/conversations.service'
import { TUser } from '@/utils/types'
import { BadRequestException, Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common'
import { Routes } from 'src/utils/constants'

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthGuard)
export class ConversationsController {
    constructor(
        private conversationService: ConversationsService,
    ) { }

    @Post('search')
    async searchConversation(@User() user: TUser, @Body() searchConversationPayload: SearchConversationDTO) {
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
    async startConversation(@User() user: TUser, @Body() createConversationPayload: CreateConversationDTO) {
        const { recipientId } = createConversationPayload
        return await this.conversationService.startConversation({
            creatorId: user.id,
            recipientId,
        })
    }

    @Get('fetch/:conversationId')
    async fetchConversation(@Param('conversationId') conversationId: string) {
        return await this.conversationService.findConversationById(parseInt(conversationId))
    }
}