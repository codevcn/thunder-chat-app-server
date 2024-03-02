import type { TUserWithProfile, TUser } from '@/utils/entities/user.entity'
import type { TCreateUserParams, TJWTToken } from '@/utils/types'

export interface IUserService {
    createUser: (createUser: TCreateUserParams) => Promise<TUser>
    getUserByEmail: (email: string) => Promise<TUserWithProfile>
    registerUser: (createUserData: TCreateUserParams) => Promise<TJWTToken>
}
