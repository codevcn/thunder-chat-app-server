import type { NodeEnvironments } from './types'

export interface IProcessEnv {
    NODE_ENV: NodeEnvironments
    PORT: number
    DATABASE_URL: string
    SESSION_SECRET: string
    SESSION_NAME: string
    COOKIE_EXPIRE_IN_HOURS: number
    JWT_SECRET: string
    JWT_TOKEN_MAX_AGE_IN_HOUR: number
    REDIS_CLOUD_DB_PASSWORD: string
    REDIS_HOST: string
    CLIENT_DOMAIN_DEV: string
    CLIENT_HOST_DEV: string
}
