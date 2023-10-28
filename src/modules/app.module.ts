import { Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt' 
import { ConversationsModule } from './conversations.module'

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: '3h',
			},
		}),
		ConversationsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
