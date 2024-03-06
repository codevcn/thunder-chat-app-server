import { Module } from '@nestjs/common'
import { UserController } from '@/user/user.controller'
import { UserService } from '@/user/user.service'
import { JWTService } from '@/auth/jwt.service'
import { AuthService } from '@/auth/auth.service'
import { CredentialService } from '@/auth/credential.service'

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, JWTService, AuthService, CredentialService],
})
export class UserModule {}
