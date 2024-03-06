import { Injectable, UnauthorizedException } from '@nestjs/common'
import type { IAuthService } from './interfaces'
import { EAuthMessages } from 'src/utils/messages'
import { UserService } from '@/user/user.service'
import { JWTService } from './jwt.service'
import { CredentialService } from './credential.service'
import { Response } from 'express'
import type { TUser } from '@/utils/entities/user.entity'
import { CheckAuthEntity } from './auth.serialization'
import type { TLoginUserParams } from './types'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private jwtService: JWTService,
        private userService: UserService,
        private credentialService: CredentialService
    ) {}

    async loginUser(res: Response, { email, password }: TLoginUserParams) {
        const user = await this.userService.getUserByEmail(email)

        const isMatch = await this.credentialService.compareHashedPassword(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException(EAuthMessages.INCORRECT_EMAIL_PASSWORD)
        }

        const { jwt_token } = await this.jwtService.createJWT({
            email: user.email,
            user_id: user.id,
        })

        this.jwtService.sendJWT({
            response: res,
            token: jwt_token,
        })
    }

    logoutUser(res: Response) {
        this.jwtService.removeJWT({ response: res })
    }

    authUser(user: TUser) {
        return new CheckAuthEntity(user)
    }
}
