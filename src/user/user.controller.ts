import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { CreateUserDto, GetUserByEmailDto } from '@/user/user.dto'
import { UserService } from '@/user/user.service'
import { ERoutes } from '@/utils/enums'
import { JWTService } from '@/auth/jwt.service'
import type { Response } from 'express'

@Controller(ERoutes.USER)
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JWTService
    ) {}

    @Post('register')
    async register(
        @Body() createUserPayload: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { jwt_token } = await this.userService.registerUser(createUserPayload)

        this.jwtService.sendJWT({
            res,
            token: jwt_token,
        })

        return { success: true }
    }

    @Get('getUserByEmail')
    async getUserByEmail(@Query() getUserByEmailPayload: GetUserByEmailDto) {
        return await this.userService.getUserByEmail(getUserByEmailPayload.email)
    }
}
