import { Request } from 'express'
import { EClientCookieNames, EProviderTokens } from '@/utils/enums'
import { EAuthMessages } from 'src/utils/messages'
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    Inject,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { TJWTPayload } from 'src/utils/types'
import { PrismaService } from '@/utils/ORM/prisma.service'
import { ConfigService } from '@nestjs/config'
import type { IProcessEnv } from '@/utils/interfaces'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject(EProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService,
        private configService: ConfigService<IProcessEnv>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        const token = this.extractToken(req)

        if (!token) {
            throw new UnauthorizedException(EAuthMessages.TOKEN_NOT_FOUND)
        }

        let payload: TJWTPayload
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            })
        } catch (error) {
            throw new UnauthorizedException(EAuthMessages.AUTHENTICATION_FAIL)
        }

        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: payload.user_id,
                },
            })

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
