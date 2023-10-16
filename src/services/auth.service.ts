import { Injectable, UnauthorizedException } from '@nestjs/common'
import { IAuthService } from 'src/utils/interfaces'
import { TLoginUser, TCreateUser } from 'src/utils/types'
import { EExceptionMessages } from 'src/utils/messages'
import { compareHashedPassword } from 'src/utils/helpers'
import { JwtService } from '@nestjs/jwt'
import { UserService } from './user.service'
import { setJWTPayload } from 'src/utils/jwt'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async loginUser({ email, password }: TLoginUser) {
        const user = await this.userService.getUserByEmail(email)

        const isMatch = await compareHashedPassword(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException(EExceptionMessages.INCORRECT_EMAIL_PASSWORD)
        }

        const jwt_payload = setJWTPayload({ email: user.email, user_id: user.id })

        return {
            jwt_token: await this.jwtService.signAsync(jwt_payload),
        }
    }

    async registerUser(createUserData: TCreateUser) {
        const user = await this.userService.createUser(createUserData)

        const jwt_payload = setJWTPayload({ email: user.email, user_id: user.id })

        return {
            jwt_token: await this.jwtService.signAsync(jwt_payload),
        }
    }
}