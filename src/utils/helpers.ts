import { my_location_src } from '@/test/test'

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
