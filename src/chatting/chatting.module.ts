import { ChattingGateway } from '@/chatting/chatting.gateway'
import { Module } from '@nestjs/common'
import { ChattingService } from './chatting.service'
import { JWTService } from '@/auth/jwt.service'

@Module({
    providers: [ChattingGateway, ChattingService, JWTService],
})
export class ChattingModule {}
