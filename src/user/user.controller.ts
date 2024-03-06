import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { CreateUserDTO, GetUserByEmailDTO } from '@/user/user.dto'
import { UserService } from '@/user/user.service'
import { ERoutes } from '@/utils/enums'
import { JWTService } from '@/auth/jwt.service'
import type { Response } from 'express'
import { IUserController } from './interfaces'

@Controller(ERoutes.USER)
export class UserController implements IUserController {
    constructor(
        private userService: UserService,
        private jwtService: JWTService
    ) {}

    @Post('register')
    async register(
        @Body() createUserPayload: CreateUserDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const { jwt_token } = await this.userService.registerUser(createUserPayload)

        this.jwtService.sendJWT({
            response: res,
            token: jwt_token,
        })

        return { success: true }
    }

    @Get('getUserByEmail')
    async getUserByEmail(@Query() getUserByEmailPayload: GetUserByEmailDTO) {
        return await this.userService.getUserByEmail(getUserByEmailPayload.email)
    }
}
