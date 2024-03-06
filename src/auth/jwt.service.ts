import type { TJWTPayload, TSendJWTParams, TRemoveJWTParams } from './types'
import { JwtService } from '@nestjs/jwt'
import { EClientCookieNames } from '@/utils/enums'
import { Injectable } from '@nestjs/common'
import type { IJWTService } from './interfaces'
import ms from 'ms'

@Injectable()
export class JWTService implements IJWTService {
    private jwtCookieOptions = {
        maxAge: ms(process.env.JWT_TOKEN_MAX_AGE_IN_HOUR),
        domain: process.env.CLIENT_DOMAIN_DEV,
        path: '/',
        httpOnly: true,
        secure: true,
    }

    constructor(private jwtService: JwtService) {}

    getJWTcookieOtps() {
        return this.jwtCookieOptions
    }

    async createJWT(payload: TJWTPayload) {
        return {
            jwt_token: await this.jwtService.signAsync(payload),
        }
    }

    async verifyToken(token: string) {
        return await this.jwtService.verifyAsync<TJWTPayload>(token, {
            secret: process.env.JWT_SECRET,
        })
    }

    sendJWT({ response, token, cookie_otps }: TSendJWTParams) {
        response.cookie(
            EClientCookieNames.JWT_TOKEN_AUTH,
            token,
            cookie_otps || this.getJWTcookieOtps()
        )
    }

    removeJWT({ response, cookie_otps }: TRemoveJWTParams) {
        response.clearCookie(
            EClientCookieNames.JWT_TOKEN_AUTH,
            cookie_otps || this.getJWTcookieOtps()
        )
    }
}
