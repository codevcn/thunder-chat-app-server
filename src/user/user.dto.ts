import { IsEmail, IsISO8601, IsNotEmpty, MinLength } from 'class-validator'
import { ELengths } from '@/utils/enums'
import { EValidationMessages } from 'src/utils/messages'

export class CreateUserDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(ELengths.PASSWORD_MIN_LEN)
    password: string

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsISO8601({}, { message: EValidationMessages.WRONG_DATE_ISO_TYPE })
    birthday: Date
}

export class GetUserByEmailDTO {
    @IsEmail()
    email: string
}
