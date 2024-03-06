import { IsNotEmpty } from 'class-validator'

export class LoginUserDTO {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}
