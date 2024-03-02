import { MessageController } from "@/message/message.controller"
import { MessageService } from "@/message/messages.service"
import { PrismaService } from "@/utils/ORM/prisma.service"
import { Module } from "@nestjs/common"

@Module({
    imports: [],
    providers: [
        MessageService,
    ],
    controllers: [
        MessageController,
    ],
})
export class MessageModule { }