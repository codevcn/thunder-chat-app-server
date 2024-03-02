import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import { connectRedisStore } from './configs/connectRedisStore.config'
import { GlobalExceptionFilter } from './utils/exception/globalException.filter'
import * as cookieParser from 'cookie-parser'
import { processEnv } from '@/configs/env.config'
import { HttpExceptionValidation } from './utils/validation/httpException.validation'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    // set api prefix
    app.setGlobalPrefix('api')

    // for getting cookie in req
    app.use(cookieParser())

    // cors
    app.enableCors({
        origin: [processEnv.CLIENT_HOST_DEV!],
        credentials: true,
    })

    // global exception filter
    app.useGlobalFilters(new GlobalExceptionFilter(new HttpExceptionValidation()))

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
    // 		maxAge: COOKIE_EXPIRE_IN_HOURS * 60 * 60 * 2,
    // 		httpOnly: true,
    // 	}
    // }))

    // to be able to use dtos in controllers
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(processEnv.PORT!, () => {
        console.log('>>> Server is working on PORT', processEnv.PORT)
    })
}

bootstrap()
