
import { IMessageService } from "@/utils/interfaces"
import { Inject, Injectable } from "@nestjs/common"
import { PrismaService } from "./prisma.service"
import { ProviderTokens } from "@/utils/constants"

@Injectable()
export class MessageService implements IMessageService {
    constructor(
        @Inject(ProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService,
    ) { }

    async findMessagesByConversationId({ conversationId }: { conversationId: number }) {
        return await this.prismaService.message.findMany({
            where: {
                conversationId,
            }
        })
    }
}