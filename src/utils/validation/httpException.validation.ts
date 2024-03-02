import { UserException } from '@/user/user.exception'
import { IExceptionValidationService } from '@/utils/validation/interfaces'
import { EValidationMessages } from '@/utils/messages'
import { HttpException, Injectable } from '@nestjs/common'

@Injectable()
export class HttpExceptionValidation implements IExceptionValidationService<HttpException> {
    validateException(exception: HttpException) {
        return {
            message: this.getExceptionMessage(exception.getResponse()),
            name: exception.name,
            stack: exception.stack || EValidationMessages.NO_TRACE,
            status: exception.getStatus(),
            isUserException: this.checkIsUserException(exception),
        }
    }

    private getExceptionMessage(exception_response: string | object) {
        if (typeof exception_response === 'object') {
            if ('message' in exception_response) {
                const message = exception_response.message

                if (Array.isArray(message)) {
                    return message.join(', ')
                } else if (typeof message === 'string') {
                    return message
                }

                return EValidationMessages.SOMETHING_WENT_WRONG
            }
            return EValidationMessages.SOMETHING_WENT_WRONG
        }
        return exception_response
    }

    private checkIsUserException(exception: HttpException) {
        return exception instanceof UserException
    }
}
