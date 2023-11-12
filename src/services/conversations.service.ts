
import { IConversationsService } from '@/utils/interfaces'
import { TStartConversationParams, TSearchConversationParams } from '@/utils/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { ProviderTokens } from '@/utils/constants'

@Injectable()
export class ConversationsService implements IConversationsService {
    constructor(
        @Inject(ProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService,
    ) { }

    async searchConversation({ email, username, nameOfUser, creatorId }: TSearchConversationParams) {
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
                        }
                    }
                ],
                NOT: {
                    id: creatorId,
                },
            },
            include: {
                Profile: true
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
                    }
                }
            }
        })
    }

    async findConversationById(id: number) {
        return await this.prismaService.conversation.findUnique({
            where: { id },
            include: {
                recipient: {
                    include: {
                        Profile: true,
                    }
                }
            }
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
                    }
                }
            }
        })
    }
}