import { Exclude } from 'class-transformer'

export class CheckAuthEntity {
    id: number
    firstName: string
    lastName: string
    birthday: Date | null
    createdAt: Date
    email: string
    username: string | null

    @Exclude()
    password: string

    constructor(user: CheckAuthEntity) {
        Object.assign(this, user)
    }
}
