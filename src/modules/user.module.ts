import { PrismaService } from "@/services/prisma.service"
import { Module } from "@nestjs/common"
import { UserController } from "src/controllers/user.controller"
import { UserService } from "src/services/user.service"

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        UserService,
    ],
    exports: [
        UserService,
    ]
})
export class UserModule { }