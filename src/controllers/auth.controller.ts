import { Controller, Post, Body, Res, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { Routes } from 'src/utils/constants'
import { LoginUserDto } from 'src/dtos/auth'
import { CreateUserDto } from 'src/dtos/user'
import { AuthService } from 'src/services/auth.service'
import { Response } from 'express'
import { removeJWTByCookie, sendJWTByCookie } from 'src/utils/jwt'
import { AuthGuard } from 'src/guards/auth.guard'
import { User } from '@/decorators/user.decorator'
import { TUser } from '@/utils/types'
import { AuthUserEntity } from '@/serialization/auth.entities'

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() createUserPayload: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const { jwt_token } = await this.authService.registerUser(createUserPayload)

        sendJWTByCookie({
            res: res,
            token: jwt_token,
        })

        return { success: true }
    }

    @Post('login')
    async login(@Body() loginUserPayload: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const { jwt_token } = await this.authService.loginUser(loginUserPayload)

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

    @Post('checkAuth')
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async authUser(@User() user: TUser): Promise<AuthUserEntity> {
        return new AuthUserEntity(user)
    }
}