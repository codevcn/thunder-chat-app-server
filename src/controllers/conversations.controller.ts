import { User } from '@/decorators/user.decorator'
import { SearchConversationDTO } from '@/dtos/conversation'
import { AuthGuard } from '@/guards/auth.guard'
import { ConversationsService } from '@/services/conversations.service'
import { TUser } from '@/utils/types'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { Routes } from 'src/utils/constants'

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
    constructor(
        private conversationService: ConversationsService,
    ) { }

    @Post('search')
    @UseGuards(AuthGuard)
    async createConversation(@User() user: TUser, @Body() searchConversationDTO: SearchConversationDTO) {
        return await this.conversationService.searchConversation({
            email: searchConversationDTO.email,
            username: searchConversationDTO.username,
            creatorId: user.id,
        })
    }
}