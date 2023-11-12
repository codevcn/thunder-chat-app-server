import { Controller, Get, Query } from "@nestjs/common"
import { GetUserByEmailDto } from "src/dtos/user"
import { UserService } from "src/services/user.service"
import { Routes } from "src/utils/constants"

@Controller(Routes.USER)
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get('getUserByEmail')
    async getUserByEmail(@Query() getUserByEmailPayload: GetUserByEmailDto) {
        return await this.userService.getUserByEmail(getUserByEmailPayload.email)
    }
}