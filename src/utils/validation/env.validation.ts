import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'
import { IProcessEnv } from '../interfaces'

enum NodeEnvironments {
    Development = 'development',
    Production = 'production',
}

class EnvironmentVariables implements IProcessEnv {
    @IsEnum(NodeEnvironments)
    NODE_ENV: NodeEnvironments

    @IsNumber()
    PORT: number

    @IsString()
    DATABASE_URL: string

    @IsString()
    SESSION_SECRET: string

    @IsString()
    SESSION_NAME: string

    @IsNumber()
    COOKIE_EXPIRE_IN_HOURS: number

    @IsString()
    CLIENT_HOST_DEV: string

    @IsString()
    JWT_SECRET: string

    @IsNumber()
    JWT_TOKEN_MAX_AGE_IN_HOUR: number

    @IsString()
    REDIS_CLOUD_DB_PASSWORD: string

    @IsString()
    REDIS_HOST: string

    @IsString()
    CLIENT_DOMAIN_DEV: string
}

export function envValidation(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, { skipMissingProperties: false })
    if (errors.length > 0) {
        throw new Error(errors.toString())
    }
    return validatedConfig
}
