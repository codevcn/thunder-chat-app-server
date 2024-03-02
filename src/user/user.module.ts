import { PrismaService } from "@/utils/ORM/prisma.service"
import { Module } from "@nestjs/common"
import { UserController } from "@/user/user.controller"
import { UserService } from "@/user/user.service"

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