import { MessageController } from "@/controllers/message.controller"
import { MessageService } from "@/services/messages.service"
import { PrismaService } from "@/services/prisma.service"
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