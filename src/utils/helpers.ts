import * as bcrypt from 'bcrypt'

const getHashedPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
}

const compareHashedPassword = async (password: string, encrypted: string): Promise<boolean> => {
    return await bcrypt.compare(password, encrypted)
}

export {
    getHashedPassword,
    compareHashedPassword,
}