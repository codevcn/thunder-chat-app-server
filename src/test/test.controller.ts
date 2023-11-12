import { AuthUserEntity } from "@/serialization/auth.entities"
import { PrismaService } from "@/services/prisma.service"
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common"

type TBody = {
    data: string
}

@Controller('test')
export class TestController {
    constructor(
        private prismaService: PrismaService,
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async testing(@Body() body: TBody): Promise<AuthUserEntity> {
        const user = await this.prismaService.user.findFirst({
            include: {
                Profile: true
            }
        })
        console.log('>>> user >>>', user)
        const user_data = new AuthUserEntity(user)
        console.log('>>> user_data >>>', user_data)
        return user_data
    }
} 