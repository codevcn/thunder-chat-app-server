import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import type { ICredentialService } from './interfaces'

@Injectable()
export class CredentialService implements ICredentialService {
    async compareHashedPassword(password: string, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(password, encrypted)
    }

    async getHashedPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt())
    }
}
