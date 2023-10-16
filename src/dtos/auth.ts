import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Lengths } from 'src/utils/constants'

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(Lengths.PASSWORD_MIN_LEN)
    password: string
}