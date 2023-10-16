import { HttpException } from "@nestjs/common"

export class UserException extends HttpException {
    constructor(response: string, status: number) {
        super(response, status)

        this.name = 'User Exception'
    }
}
