import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common'
import { IUserService } from 'src/utils/interfaces'
import { TCreateUserParams } from 'src/utils/types'

import { getHashedPassword } from 'src/utils/helpers'
import { EExceptionMessages } from 'src/utils/messages'
import { PrismaService } from './prisma.service'
import { ProviderTokens } from '@/utils/constants'

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(ProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService,
    ) { }

    async createUser({ email, firstName, lastName, birthday, password }: TCreateUserParams) {
        const hashedPassword = await getHashedPassword(password)
        const exist_user = await this.prismaService.user.findUnique({
            where: { email },
        })
        if (exist_user) {
            throw new ConflictException(EExceptionMessages.USER_EXISTED)
        }

        const new_user = await this.prismaService.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                birthday: birthday,
            },
        })

        return new_user
    }

    async getUserByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
            include: {
                Profile: true
            }
        })
        if (!user) {
            throw new NotFoundException(EExceptionMessages.USER_NOT_FOUND)
        }

        return user
    }
}