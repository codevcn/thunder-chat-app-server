import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { THttpErrorResBody } from 'src/utils/types'
import { validateException } from 'src/utils/validation'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response<THttpErrorResBody>>()
        const {
            message,
            name,
            stack,
            status,
            isUserException
        } = validateException(exception)

        response
            .status(status)
            .json({
                name: name,
                message: message,
                timestamp: new Date(),
                trace: stack || 'No trace',
                isUserException: isUserException,
            })
    }
}
