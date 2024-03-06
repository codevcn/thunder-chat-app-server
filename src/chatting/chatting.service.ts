import { Injectable } from '@nestjs/common'
import { IChattingService } from './interfaces'
import { Server } from 'socket.io'
import { EClientCookieNames } from '@/utils/enums'
import { EAuthMessages } from '@/utils/messages'
import { TClientCookie } from '@/utils/types'
import * as cookie from 'cookie'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ChattingService implements IChattingService {
    constructor(private jwtService: JwtService) {}

    validateConnection(server: Server) {
        server.use(async (socket, next) => {
            const clientCookie = socket.handshake.headers.cookie
            if (!clientCookie) {
                next(new Error(EAuthMessages.INVALID_CREDENTIALS))
                return
            }

            const parsed_cookie = cookie.parse(clientCookie) as TClientCookie
            const jwt = parsed_cookie[EClientCookieNames.JWT_TOKEN_AUTH]

            try {
                await this.jwtService.verifyAsync(jwt, {
                    secret: process.env.JWT_SECRET,
                })
            } catch (error) {
                next(new Error(EAuthMessages.AUTHENTICATION_FAIL))
                return
            }

            next()
        })
    }
}
