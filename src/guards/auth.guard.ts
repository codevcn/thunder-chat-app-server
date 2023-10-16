import { Request } from 'express'
import { Names } from 'src/utils/constants'
import { EExceptionMessages } from 'src/utils/messages'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TJwtPayload } from 'src/utils/types'
import { prismaClient } from 'src/config/prisma'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
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
            throw new UnauthorizedException(EExceptionMessages.TOKEN_NOT_FOUND)
        }

        try {
            req['user'] = await prismaClient.user.findUnique({
                where: {
                    id: payload.user_id,
                    email: payload.email,
                }
            })
        } catch (error) {
            throw error
        }

        return true
    }

    private extractToken(req: Request): string | undefined {
        return req.cookies[Names.JWT_TOKEN_AUTH] || undefined
    }
}