import { my_location_src } from '@/test/test'
import * as bcrypt from 'bcrypt'

export const getHashedPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, await bcrypt.genSalt())
}

export const compareHashedPassword = async (
    password: string,
    encrypted: string
): Promise<boolean> => {
    return await bcrypt.compare(password, encrypted)
}

export const convertStringToNumber = (value: string, radix: number = 10) => parseInt(value, radix)

export const logToConsoleWithLocation = (...val: any) => {
    const print = new Error().stack?.split('\n')[2].trim().split(` (${my_location_src}`)
    console.log(
        '>>>',
        print && print[1] ? print[1].slice(0, print[1].length - 1) : '',
        '>>>',
        ...val
    )
}
