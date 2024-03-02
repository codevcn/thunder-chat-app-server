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
import { LoginUserDto } from '@/auth/auth.dto'
import { AuthService } from '@/auth/auth.service'
import type { Response } from 'express'
import { AuthGuard } from '@/auth/auth.guard'
import { User } from '@/user/user.decorator'
import type { TUser } from '@/utils/entities/user.entity'
import { CheckAuthEntity } from '@/auth/auth.serialization'
import { JWTService } from '@/auth/jwt.service'

@Controller(ERoutes.AUTH)
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JWTService) {}

    @Post('login')
    async login(@Body() loginUserPayload: LoginUserDto, @Res({ passthrough: true }) res: Response) {
        const { jwt_token } = await this.authService.loginUser(loginUserPayload)

        this.jwtService.sendJWT({
            res: res,
            token: jwt_token,
        })

        return { success: true }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.jwtService.removeJWT({ res })

        return { success: true }
    }

    @Post('checkAuth')
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async authUser(@User() user: TUser): Promise<CheckAuthEntity> {
        return new CheckAuthEntity(user)
    }
}
