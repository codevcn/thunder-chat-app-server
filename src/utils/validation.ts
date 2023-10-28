import { HttpException } from "@nestjs/common"
import { UserException } from "src/exceptions/user.exception"
import { TException } from "./types"

const getExceptionMessage = (exception_response: string | object): string => {
    if (typeof exception_response === 'object') {
        if ('message' in exception_response) {

            const message = exception_response.message

            if (Array.isArray(message)) {
                return message.join(', ')
            } else if (typeof message === 'string') {
                return message
            }

            return 'Something went wrong in server...'
        } else {
            return 'Something went wrong in server...'
        }
    } else {
        return exception_response
    }
}

const validateException = <T extends HttpException = HttpException>(exception: T): TException => {
    const exception_message = getExceptionMessage(exception.getResponse())

    // for exception from user like wrong password, provide wrong credentials, ...
    if (exception instanceof UserException) {
        return {
            message: exception_message,
            name: exception.name,
            stack: exception.stack,
            status: exception.getStatus(),
            isUserException: true,
        }
    }

    return {
        message: exception_message,
        name: exception.name,
        stack: exception.stack,
        status: exception.getStatus(),
        isUserException: false,
    }
}

export {
    validateException,
}