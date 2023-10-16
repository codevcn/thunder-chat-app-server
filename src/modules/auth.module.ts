import { Module } from "@nestjs/common"
import { AuthController } from "src/controllers/auth.controller"
import { AuthService } from "src/services/auth.service"
import { UserModule } from "./user.module"

@Module({
    imports: [
        UserModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ]
})
export class AuthModule { }