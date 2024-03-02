import { createClient } from 'redis'
import RedisStore from 'connect-redis'
import { processEnv } from './env.config'

export const connectRedisStore = (): RedisStore => {
    const client = createClient({
        password: processEnv.REDIS_CLOUD_DB_PASSWORD!,
        socket: {
            host: processEnv.REDIS_HOST!,
            port: 19156,
        },
    })

    client.connect()

    return new RedisStore({
        client: client,
        prefix: 'thunderchatapp:',
    })
}
