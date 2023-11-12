import { ConversationsController } from "@/controllers/conversations.controller"
import { ConversationsService } from "@/services/conversations.service"
import { PrismaService } from "@/services/prisma.service"
import { ProviderTokens } from "@/utils/constants"
import { Module } from "@nestjs/common"

@Module({
    imports: [],
    controllers: [
        ConversationsController,
    ],
    providers: [
        ConversationsService,
    ]
})
export class ConversationsModule { }