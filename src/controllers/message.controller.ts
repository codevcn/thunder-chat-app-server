import { MessageService } from "@/services/messages.service"
import { Routes } from "@/utils/constants"
import { Controller, Get, Param } from "@nestjs/common"

@Controller(Routes.MESSAGE)
export class MessageController {
    constructor(
        private messageService: MessageService,
    ) { }

    @Get('messages/:conversationId')
    async fetchMessages(@Param('conversationId') conversationId: string) {
        return await this.messageService.findMessagesByConversationId({ conversationId: parseInt(conversationId) })
    }
}