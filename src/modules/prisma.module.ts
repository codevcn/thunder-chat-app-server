import { PrismaService } from "@/services/prisma.service"
import { ProviderTokens } from "@/utils/constants"
import { Global, Module, Provider } from "@nestjs/common"

const prisma_provider: Provider = {
    provide: ProviderTokens.PRISMA_CLIENT,
    useClass: PrismaService,
}

@Global()
@Module({
    imports: [],
    providers: [
        prisma_provider,
    ],
    exports: [
        prisma_provider,
    ]
})
export class PrismaModule { }