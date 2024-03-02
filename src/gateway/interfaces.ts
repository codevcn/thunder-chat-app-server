import { ECommonStatuses } from '@/utils/enums'

export interface IEmitEvents {
    connected: ({ connectionStatus }: { connectionStatus: ECommonStatuses }) => void
}

export interface IGatewayService {}
