import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'
import { EEnvironments } from '../enums'

class EnvironmentVariables {
    @IsEnum(EEnvironments)
    NODE_ENV: EEnvironments

    @IsNumber()
    PORT: number

    @IsString()
    DATABASE_URL: string

    @IsString()
    SESSION_SECRET: string

    @IsString()
    SESSION_NAME: string

    @IsString()
    COOKIE_EXPIRE_IN_HOURS: string

    @IsString()
    CLIENT_HOST_DEV: string

    @IsString()
    JWT_SECRET: string

    @IsString()
    JWT_TOKEN_MAX_AGE_IN_HOUR: string

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
