import type { TJWTPayload, TSendJWTParams, TRemoveJWTParams } from '@/utils/types'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { EClientCookieNames } from '@/utils/enums'
import { Injectable } from '@nestjs/common'
import { IJWTService } from './interfaces'
import { IProcessEnv } from '@/utils/interfaces'

@Injectable()
export class JWTService implements IJWTService {
    constructor(
        private configService: ConfigService<IProcessEnv>,
        private jwtService: JwtService
    ) {}

    getJWTcookieOtps() {
        return {
            maxAge: this.configService.get('JWT_TOKEN_MAX_AGE_IN_HOUR') * 3600000,
            domain: this.configService.get('CLIENT_DOMAIN_DEV'),
            path: '/',
            httpOnly: true,
            secure: true,
        }
    }

    async createJWT(payload: TJWTPayload) {
        return {
            jwt_token: await this.jwtService.signAsync(payload),
        }
    }

    sendJWT({ res, token, cookie_otps }: TSendJWTParams) {
        res.cookie(EClientCookieNames.JWT_TOKEN_AUTH, token, cookie_otps || this.getJWTcookieOtps())
    }

    removeJWT({ res, cookie_otps }: TRemoveJWTParams) {
        res.clearCookie(EClientCookieNames.JWT_TOKEN_AUTH, cookie_otps || this.getJWTcookieOtps())
    }
}
