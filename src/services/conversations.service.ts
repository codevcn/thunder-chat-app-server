import { prismaClient } from '@/config/prisma'
import { IConversations } from '@/utils/interfaces'
import { TSearchConversation, TUser } from '@/utils/types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConversationsService implements IConversations {
    constructor() { }

    async searchConversation({ email, username, creatorId }: TSearchConversation) {
        let user: TUser

        if (email || username) {
            user = await prismaClient.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ],
                    NOT: {
                        id: creatorId,
                    }
                }
            })
        }

        return user
    }
}