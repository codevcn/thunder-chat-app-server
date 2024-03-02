import { PrismaService } from '@/utils/ORM/prisma.service'
import { EProviderTokens } from '@/utils/enums'
import { Global, Module, Provider } from '@nestjs/common'

const prisma_provider: Provider = {
    provide: EProviderTokens.PRISMA_CLIENT,
    useClass: PrismaService,
}

@Global()
@Module({
    imports: [],
    providers: [prisma_provider],
    exports: [prisma_provider],
})
export class PrismaModule {}
