
import { TUser } from '@/utils/types'
import { Exclude } from 'class-transformer'

export class AuthUserEntity implements TUser {
    id: number
    firstName: string
    lastName: string
    birthday: Date
    createdAt: Date
    email: string
    username: string

    @Exclude()
    password: string

    constructor(user: AuthUserEntity) {
        Object.assign(this, user)
    }
}