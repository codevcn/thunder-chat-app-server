import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import type { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server } from 'socket.io'
import type { Socket } from 'socket.io'
import { ECommonStatuses } from '@/utils/enums'
import type { IEmitEvents } from './interfaces'
import { logToConsoleWithLocation } from '@/utils/helpers'
import { EChattingEvent } from './events'
import { ChattingService } from './chatting.service'
import { ESocketNamespaces } from './enums'

@WebSocketGateway({
    cors: {
        origin:
            process.env.NODE_ENV === 'production'
                ? process.env.CLIENT_HOST
                : process.env.CLIENT_HOST_DEV,
        credentials: true,
    },
    namespace: ESocketNamespaces.Chatting,
})
export class ChattingGateway
    implements
        OnGatewayConnection<Socket<IEmitEvents>>,
        OnGatewayDisconnect<Socket<IEmitEvents>>,
        OnGatewayInit<Server>
{
    @WebSocketServer()
    server: Server

    constructor(private chattingService: ChattingService) {}

    afterInit(serverInit: Server) {
        this.chattingService.validateConnection(serverInit)
    }

    handleConnection(socket: Socket<IEmitEvents>) {
        logToConsoleWithLocation('connected socket id >>>', socket.id)

        socket.emit(EChattingEvent.client_connected, {
            connectionStatus: ECommonStatuses.SUCCESS,
            connectId: socket.id,
        })
    }

    handleDisconnect(socket: Socket<IEmitEvents>) {
        logToConsoleWithLocation('discnn socket id >>>', socket.id)
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
