import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ELengths } from '@/utils/enums'

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(ELengths.PASSWORD_MIN_LEN)
    password: string
}
