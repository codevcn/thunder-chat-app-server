import { logToConsoleWithLocation } from '@/utils/helpers'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        logToConsoleWithLocation('req >>>', req.cookies)
        next()
    }
}

export function logger(req: Request, res: Response, next: NextFunction) {
    logToConsoleWithLocation('req >>>', req.cookies)
    next()
}
