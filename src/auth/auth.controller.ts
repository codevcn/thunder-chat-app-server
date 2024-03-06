import {
    Controller,
    Post,
    Body,
    Res,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common'
import { ERoutes } from '@/utils/enums'
import { LoginUserDTO } from '@/auth/auth.dto'
import { AuthService } from '@/auth/auth.service'
import type { Response } from 'express'
import { AuthGuard } from '@/auth/auth.guard'
import { User } from '@/user/user.decorator'
import type { TUser } from '@/utils/entities/user.entity'
import { IAuthController } from './interfaces'

@Controller(ERoutes.AUTH)
export class AuthController implements IAuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginUserPayload: LoginUserDTO, @Res({ passthrough: true }) res: Response) {
        await this.authService.loginUser(res, loginUserPayload)
        return { success: true }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.logoutUser(res)
        return { success: true }
    }

    @Post('checkAuth')
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async authUser(@User() user: TUser) {
        return this.authService.authUser(user)
    }
}
