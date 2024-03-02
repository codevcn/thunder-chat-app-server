import { IMessageService } from './interfaces'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../utils/ORM/prisma.service'
import { EProviderTokens } from '@/utils/enums'

@Injectable()
export class MessageService implements IMessageService {
    constructor(@Inject(EProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService) {}

    async findMessagesByConversationId({ conversationId }: { conversationId: number }) {
        return await this.prismaService.message.findMany({
            where: {
                conversationId,
            },
        })
    }
}
