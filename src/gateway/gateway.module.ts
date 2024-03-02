import { Gateway } from '@/gateway/gateway'
import { Module } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Module({
    providers: [Gateway, GatewayService],
})
export class GatewayModule {}
