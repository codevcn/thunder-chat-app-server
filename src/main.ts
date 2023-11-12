import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import connectRedisStore from './config/connectRedisStore'
import { HttpExceptionFilter } from './filters/globalException.filter'
import * as cookieParser from 'cookie-parser'

const {
	PORT,
	SESSION_SECRET,
	SESSION_NAME,
	COOKIE_EXPIRE_IN_HOURS,
	CLIENT_HOST,
} = process.env

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// set api prefix
	app.setGlobalPrefix('api')
	
	// for getting cookie in req
	app.use(cookieParser())

	// cors
	app.enableCors({
		origin: [
			CLIENT_HOST,
		],
		credentials: true,
	})

	// global exception filter
	app.useGlobalFilters(new HttpExceptionFilter())

	// session
	// app.use(session({
	// 	secret: SESSION_SECRET,
	// 	resave: false,
	// 	saveUninitialized: false,
	// 	name: SESSION_NAME,
	// 	store: connectRedisStore(),
	// 	cookie: {
	// 		secure: true,
	// 		sameSite: true,
	// 		maxAge: parseInt(COOKIE_EXPIRE_IN_HOURS) * 60 * 60 * 2,
	// 		httpOnly: true,
	// 	}
	// }))

	// to be able to use dtos in controllers
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(PORT, () => {
		console.log('>>> Server is working on PORT', PORT)
	})
}

bootstrap()
