import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import type { Response } from 'express'
import type { THttpErrorResBody } from '@/utils/types'
import { HttpExceptionValidation } from '@/utils/validation/httpException.validation'

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter<HttpException> {
    constructor(private httpExceptionValidation: HttpExceptionValidation) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const validatedException = this.httpExceptionValidation.validateException(exception)

        const response = ctx.getResponse<Response<THttpErrorResBody>>()

        response.status(validatedException.status).json({
            name: validatedException.name,
            message: validatedException.message,
            timestamp: new Date(),
            trace: validatedException.stack,
            isUserException: validatedException.isUserException,
        })
    }
}
