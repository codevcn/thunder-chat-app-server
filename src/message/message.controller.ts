import { MessageService } from '@/message/messages.service'
import { ERoutes } from '@/utils/enums'
import { convertStringToNumber } from '@/utils/helpers'
import { Controller, Get, Param } from '@nestjs/common'

@Controller(ERoutes.MESSAGE)
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Get('messages/:conversationId')
    async fetchMessages(@Param('conversationId') conversationId: string) {
        return await this.messageService.findMessagesByConversationId({
            conversationId: convertStringToNumber(conversationId, 10),
        })
    }
}
