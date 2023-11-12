import { Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ConversationsModule } from './conversations.module'
import { TestModule } from '@/test/test.module'
import { MessageModule } from './message.module'
import { Expires } from '@/utils/constants'
import { PrismaModule } from './prisma.module'

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: Expires.JWT_EXPIRE,
			},
		}),
		ConversationsModule,
		MessageModule,
		TestModule,
	],
})
export class AppModule { }
