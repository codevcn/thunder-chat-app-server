import { IsEmail, IsISO8601, IsNotEmpty, MinLength } from "class-validator"
import { Lengths } from "src/utils/constants"
import { ValidationMessages } from "src/utils/messages"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(Lengths.PASSWORD_MIN_LEN)
    password: string

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsISO8601({}, { message: ValidationMessages.WRONG_DATE_ISO_TYPE })
    birthday: Date
}

export class GetUserByEmailDto {
    @IsEmail()
    email: string
}