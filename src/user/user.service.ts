import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common'
import type { IUserService } from './interfaces'
import type { TCreateUserParams } from './types'
import { EAuthMessages } from 'src/utils/messages'
import { PrismaService } from '../utils/ORM/prisma.service'
import { EProviderTokens } from '@/utils/enums'
import { JWTService } from '@/auth/jwt.service'
import { CredentialService } from '@/auth/credential.service'

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(EProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService,
        private jwtService: JWTService,
        private credentialService: CredentialService
    ) {}

    async findById(id: number) {
        return await this.prismaService.user.findUnique({
            where: { id },
        })
    }

    async registerUser(createUserData: TCreateUserParams) {
        const user = await this.createUser(createUserData)

        return this.jwtService.createJWT({ email: user.email, user_id: user.id })
    }

    async createUser({ email, firstName, lastName, birthday, password }: TCreateUserParams) {
        const hashedPassword = await this.credentialService.getHashedPassword(password)
        const exist_user = await this.prismaService.user.findUnique({
            where: { email },
        })
        if (exist_user) {
            throw new ConflictException(EAuthMessages.USER_EXISTED)
        }

        return await this.prismaService.user.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                birthday: birthday,
            },
        })
    }

    async getUserByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
            include: {
                Profile: true,
            },
        })
        if (!user) {
            throw new NotFoundException(EAuthMessages.USER_NOT_FOUND)
        }

        return user
    }
}
