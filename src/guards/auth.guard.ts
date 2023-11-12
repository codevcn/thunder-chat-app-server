import { Request } from 'express'
import { Names, ProviderTokens } from 'src/utils/constants'
import { EExceptionMessages } from 'src/utils/messages'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TJwtPayload } from 'src/utils/types'
import { PrismaService } from '@/services/prisma.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        @Inject(ProviderTokens.PRISMA_CLIENT) private prismaService: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        const token = this.extractToken(req)

        if (!token) {
            throw new UnauthorizedException(EExceptionMessages.TOKEN_NOT_FOUND)
        }

        let payload: TJwtPayload
        try {
            payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                }
            )
        } catch (error) {
            throw new UnauthorizedException(EExceptionMessages.AUTHENTICATION_FAIL)
        }

        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: payload.user_id,
                }
            })

            req['user'] = user
        } catch (error) {
            throw error
        }

        return true
    }

    private extractToken(req: Request): string | undefined {
        return req.cookies[Names.JWT_TOKEN_AUTH] || undefined
    }
}