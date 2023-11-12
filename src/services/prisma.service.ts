import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect()
            console.log('>>> Connect DB successfully')
        } catch (error) {
            console.log('>>> DB connecting error >>>', error)
        }
    }
}