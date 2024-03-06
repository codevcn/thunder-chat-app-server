import { ECommonStatuses } from '@/utils/enums'
import { EChattingEvent } from './events'
import { Server } from 'socket.io'

export interface IEmitEvents {
    [EChattingEvent.client_connected]: ({
        connectionStatus,
        connectId,
    }: {
        connectionStatus: ECommonStatuses
        connectId: string
    }) => void
}

export interface IChattingService {
    validateConnection: (server: Server) => void
}
