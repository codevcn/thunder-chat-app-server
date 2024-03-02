import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ConversationsModule } from './conversation/conversation.module'
import { TestModule } from '@/test/test.module'
import { MessageModule } from './message/message.module'
import { PrismaModule } from './utils/ORM/prisma.module'
import { processEnv } from '@/configs/env.config'
import { GatewayModule } from './gateway/gateway.module'
import { envValidation } from './utils/validation/env.validation'

const global_modules = [
    ConfigModule.forRoot({
        load: [() => processEnv],
        isGlobal: true,
        validate: envValidation,
    }),
    PrismaModule,
    JwtModule.register({
        global: true,
        secret: processEnv.JWT_SECRET,
        signOptions: {
            expiresIn: processEnv.JWT_TOKEN_MAX_AGE_IN_HOUR,
        },
    }),
]

@Module({
    imports: [
        ...global_modules,
        AuthModule,
        ConversationsModule,
        MessageModule,
        GatewayModule,
        TestModule,
    ],
})
export class AppModule {}
