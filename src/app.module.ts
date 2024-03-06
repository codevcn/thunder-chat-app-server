import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ConversationsModule } from './conversation/conversation.module'
import { MessageModule } from './message/message.module'
import { PrismaModule } from './utils/ORM/prisma.module'
import { envValidation } from './utils/validation/env.validation'
import { UserModule } from './user/user.module'
import ms from 'ms'

const global_config_modules = [
    ConfigModule.forRoot({
        envFilePath: ['.env.development', '.env'],
        validate: envValidation,
    }),
    PrismaModule,
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: ms(process.env.JWT_TOKEN_MAX_AGE_IN_HOUR),
        },
    }),
]

// put gateway here to be able to get env right way
import { ChattingModule } from './chatting/chatting.module'

@Module({
    imports: [
        ...global_config_modules,
        AuthModule,
        ConversationsModule,
        MessageModule,
        ChattingModule,
        UserModule,
    ],
})
export class AppModule {}
