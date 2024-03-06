import { Module } from '@nestjs/common'
import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { JWTService } from '@/auth/jwt.service'
import { UserService } from '@/user/user.service'
import { CredentialService } from './credential.service'

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, JWTService, UserService, CredentialService],
})
export class AuthModule {}
