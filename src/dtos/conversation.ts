import { IsEmail, IsNotEmpty } from "class-validator"

export class SearchConversationDTO {
    @IsEmail()
    email: string

    username: string
}