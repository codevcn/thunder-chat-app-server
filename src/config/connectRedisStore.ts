import { createClient } from 'redis'
import RedisStore from "connect-redis"

const { REDIS_CLOUD_DB_PASSWORD, REDIS_HOST } = process.env

const connectRedisStore = (): RedisStore => {
    const client = createClient({
        password: REDIS_CLOUD_DB_PASSWORD,
        socket: {
            host: REDIS_HOST,
            port: 19156
        }
    })

    client.connect()

    return new RedisStore({
        client: client,
        prefix: 'thunderchatapp:'
    })
}

export default connectRedisStore