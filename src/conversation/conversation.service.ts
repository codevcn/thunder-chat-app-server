import { IConversationsService } from './interfaces'
import type { TStartConversationParams, TSearchConversationParams } from '@/utils/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '@/utils/ORM/prisma.service'
import { EProviderTokens } from '@/utils/enums'

@Injectable()
export class ConversationService implements IConversationsService {
    constructor(@Inject(EProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService) {}

    async searchConversation({
        email,
        username,
        nameOfUser,
        creatorId,
    }: TSearchConversationParams) {
        const user = await this.prismaService.user.findMany({
            where: {
                OR: [
                    { email },
                    { username },
                    {
                        firstName: {
                            contains: nameOfUser,
                        },
                    },
                    {
                        lastName: {
                            contains: nameOfUser,
                        },
                    },
                ],
                NOT: {
                    id: creatorId,
                },
            },
            include: {
                Profile: true,
            },
        })

        return user
    }

    async findConversation({ recipientId, creatorId }: TStartConversationParams) {
        return await this.prismaService.conversation.findFirst({
            where: {
                creatorId,
                recipientId,
            },
            include: {
                recipient: {
                    include: {
                        Profile: true,
                    },
                },
            },
        })
    }

    async findConversationById(id: number) {
        return await this.prismaService.conversation.findUnique({
            where: { id },
            include: {
                recipient: {
                    include: {
                        Profile: true,
                    },
                },
            },
        })
    }

    async startConversation({ recipientId, creatorId }: TStartConversationParams) {
        const exist_conversation = await this.findConversation({ recipientId, creatorId })
        if (exist_conversation) {
            return exist_conversation
        }

        return await this.prismaService.conversation.create({
            data: {
                creatorId,
                recipientId,
            },
            include: {
                recipient: {
                    include: {
                        Profile: true,
                    },
                },
            },
        })
    }
}
