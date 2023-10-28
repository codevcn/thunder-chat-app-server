import { TRequestWithUser } from '@/utils/types'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<TRequestWithUser>()
        return request.user
    },
)