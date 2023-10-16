import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common'
import { Routes } from 'src/utils/constants'
import { LoginUserDto } from 'src/dtos/auth'
import { CreateUserDto } from 'src/dtos/user'
import { AuthService } from 'src/services/auth.service'
import { Response } from 'express'
import { removeJWTByCookie, sendJWTByCookie } from 'src/utils/jwt'
import { AuthGuard } from 'src/guards/auth.guard'
import { TRequestWithUser } from 'src/utils/types'

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const { jwt_token } = await this.authService.registerUser(createUserDto)

        sendJWTByCookie({
            res: res,
            token: jwt_token,
        })

        return { success: true }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const { jwt_token } = await this.authService.loginUser(loginUserDto)

        sendJWTByCookie({
            res: res,
            token: jwt_token,
        })

        return { success: true }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        removeJWTByCookie({ res })

        return { success: true }
    }

    @Post('authUser')
    @UseGuards(AuthGuard)
    async authUser(@Req() req: TRequestWithUser) {
        delete req.user['password']
        return req.user
    }
}