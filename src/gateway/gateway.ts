import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import type { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { processEnv } from '@/configs/env.config'
import type { Socket } from 'socket.io'
import { ECommonStatuses, EClientCookieNames } from '@/utils/enums'
import type { IEmitEvents } from './interfaces'
import { logToConsoleWithLocation } from '@/utils/helpers'
import * as cookie from 'cookie'
import type { TClientCookie } from '@/utils/types'
import { JwtService } from '@nestjs/jwt'
import { EAuthMessages } from '@/utils/messages'
import { ConfigService } from '@nestjs/config'
import type { IProcessEnv } from '@/utils/interfaces'

@WebSocketGateway({
    cors: {
        origin: processEnv.CLIENT_HOST_DEV,
        credentials: true,
    },
})
export class Gateway
    implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket>, OnGatewayInit<Server>
{
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService<IProcessEnv>
    ) {}

    @WebSocketServer()
    server: Server

    afterInit(serverInit: Server) {
        serverInit.use(async (socket, next) => {
            const clientCookie = socket.handshake.headers.cookie
            if (!clientCookie) {
                next(new Error(EAuthMessages.INVALID_CREDENTIALS))
                return
            }

            const parsed_cookie = cookie.parse(clientCookie) as TClientCookie
            const jwt = parsed_cookie[EClientCookieNames.JWT_TOKEN_AUTH]

            try {
                await this.jwtService.verifyAsync(jwt, {
                    secret: this.configService.get('JWT_SECRET'),
                })
            } catch (error) {
                next(new Error(EAuthMessages.AUTHENTICATION_FAIL))
                return
            }

            next()
        })
    }

    handleConnection(socket: Socket<{}, IEmitEvents>) {
        logToConsoleWithLocation('connected id >>>', socket.id)
        logToConsoleWithLocation('connected hanshake >>>', socket.handshake)
        socket.emit('connected', { connectionStatus: ECommonStatuses.SUCCESS })
    }

    handleDisconnect(socket: Socket) {
        logToConsoleWithLocation('dis_connect id >>>', socket.id)
        logToConsoleWithLocation('dis_connect hanshake >>>', socket.handshake)
    }

    @SubscribeMessage('foo')
    async handlefoo(@MessageBody() data: number): Promise<number> {
        logToConsoleWithLocation(data)
        return data
    }

    @SubscribeMessage('test')
    handletest(@MessageBody() data: string): string {
        logToConsoleWithLocation(data)
        return data
    }
}
