import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
    log: ['error'],
})

const connectDB = async () => {
    try {
        await prismaClient.$connect()
        console.log('>>> Connect DB successfully')
    } catch (error) {
        console.log('>>> DB connecting error >>>', error)
    }
}

export {
    prismaClient,
    connectDB,
}