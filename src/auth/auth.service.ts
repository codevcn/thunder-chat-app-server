import { Injectable, UnauthorizedException } from '@nestjs/common'
import { IAuthService } from './interfaces'
import type { TLoginUserParams } from 'src/utils/types'
import { EAuthMessages } from 'src/utils/messages'
import { compareHashedPassword } from 'src/utils/helpers'
import { UserService } from '@/user/user.service'
import { JWTService } from './jwt.service'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private jwtService: JWTService,
        private userService: UserService
    ) {}

    async loginUser({ email, password }: TLoginUserParams) {
        const user = await this.userService.getUserByEmail(email)

        const isMatch = await compareHashedPassword(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException(EAuthMessages.INCORRECT_EMAIL_PASSWORD)
        }

        return this.jwtService.createJWT({ email: user.email, user_id: user.id })
    }
}
