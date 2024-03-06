import type { TUserWithProfile, TUser } from '@/utils/entities/user.entity'
import type { TCreateUserParams } from './types'
import type { TJWTToken, TSuccess } from '@/utils/types'
import { CreateUserDTO, GetUserByEmailDTO } from './user.dto'
import { Response } from 'express'

export interface IUserController {
    register: (createUserPayload: CreateUserDTO, res: Response) => Promise<TSuccess>
    getUserByEmail: (getUserByEmailPayload: GetUserByEmailDTO) => Promise<TUserWithProfile>
}

export interface IUserService {
    createUser: (createUser: TCreateUserParams) => Promise<TUser>
    getUserByEmail: (email: string) => Promise<TUserWithProfile>
    registerUser: (createUserData: TCreateUserParams) => Promise<TJWTToken>
}
