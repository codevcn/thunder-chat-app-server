import { HttpException } from '@nestjs/common'

// for exceptions from user like wrong password, wrong credentials, ...
export class UserException extends HttpException {
    constructor(response: string, status: number) {
        super(response, status)

        this.name = 'User Exception'
    }
}
