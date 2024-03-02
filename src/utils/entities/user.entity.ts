import type { User } from '@prisma/client'
import type { TProfile } from './profile.entity'

export type TUser = User

export type TUserWithProfile = TUser & { Profile: Omit<TProfile, 'id' | 'userId'> | null }
