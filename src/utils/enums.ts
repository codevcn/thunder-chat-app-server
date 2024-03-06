export enum ERoutes {
    AUTH = 'auth',
    USER = 'user',
    CONVERSATIONS = 'conversations',
    MESSAGE = 'message',
}

export enum EClientCookieNames {
    JWT_TOKEN_AUTH = 'jwt_token_auth',
}

export enum ELengths {
    PASSWORD_MIN_LEN = 6,
}

export enum EProviderTokens {
    PRISMA_CLIENT = 'Prisma_Client_Provider',
}

export enum ECommonStatuses {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
}

export enum EEnvironments {
    development = 'development',
    production = 'production',
}
