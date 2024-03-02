import { Injectable } from '@nestjs/common'
import { IGatewayService } from './interfaces'

@Injectable()
export class GatewayService implements IGatewayService {}
