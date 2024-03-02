import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class SearchConversationDTO {
    @IsEmail()
    @IsOptional()
    email: string

    @IsOptional()
    username: string

    @IsOptional()
    nameOfUser: string
}

export class CreateConversationDTO {
    @IsNotEmpty()
    @IsNumber()
    recipientId: number
}

export class FetchConversationDTO {
    @IsNotEmpty()
    @IsNumber()
    conversationId: number
}