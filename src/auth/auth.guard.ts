import { Request } from 'express'
import { EClientCookieNames } from '@/utils/enums'
import { EAuthMessages } from 'src/utils/messages'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import type { TJWTPayload } from './types'
import { JWTService } from './jwt.service'
import { UserService } from '@/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JWTService,
        private userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        const token = this.extractToken(req)

        if (!token) {
            throw new UnauthorizedException(EAuthMessages.TOKEN_NOT_FOUND)
        }

        let payload: TJWTPayload
        try {
            payload = await this.jwtService.verifyToken(token)
        } catch (error) {
            throw new UnauthorizedException(EAuthMessages.AUTHENTICATION_FAIL)
        }

        try {
            const user = await this.userService.findById(payload.user_id)

            req['user'] = user
        } catch (error) {
            throw error
        }

        return true
    }

    private extractToken(req: Request): string | undefined {
        return req.cookies[EClientCookieNames.JWT_TOKEN_AUTH] || undefined
    }
}
