declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
            PORT: string
            DATABASE_URL: string
            SESSION_SECRET: string
            SESSION_NAME: string
            COOKIE_EXPIRE_IN_HOURS: string
            JWT_SECRET: string
            JWT_TOKEN_MAX_AGE_IN_HOUR: string
            REDIS_CLOUD_DB_PASSWORD: string
            REDIS_HOST: string
            CLIENT_DOMAIN_DEV: string
            CLIENT_HOST_DEV: string
            CLIENT_DOMAIN: string
            CLIENT_HOST: string
        }
    }
}

export {}
