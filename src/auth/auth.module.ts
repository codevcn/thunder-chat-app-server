import { Module } from '@nestjs/common'
import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { UserModule } from '../user/user.module'
import { JWTService } from '@/auth/jwt.service'

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, JWTService],
})
export class AuthModule {}
