import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { IUserService } from 'src/utils/interfaces'
import { TCreateUser } from 'src/utils/types'
import { prismaClient } from 'src/config/prisma'
import { getHashedPassword } from 'src/utils/helpers'
import { EExceptionMessages } from 'src/utils/messages'

@Injectable()
export class UserService implements IUserService {

    async createUser({ email, firstName, lastName, birthday, password }: TCreateUser) {
        const hashedPassword = await getHashedPassword(password)
        const exist_user = await prismaClient.user.findUnique({
            where: { email },
        })
        if (exist_user) {
            throw new ConflictException(EExceptionMessages.USER_EXISTED)
        }

        const new_user = await prismaClient.user.create({
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
        const user = await prismaClient.user.findUnique({
            where: {
                email: email,
            },
        })
        if (!user) {
            throw new NotFoundException(EExceptionMessages.USER_NOT_FOUND)
        }

        return user
    }
}