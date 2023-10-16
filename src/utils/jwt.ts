import { CookieOptions, Response } from "express"
import { Names } from "./constants"
import { TJWTToken, TJwtPayload } from "./types"

const { JWT_TOKEN_MAX_AGE_IN_HOUR } = process.env

const cookie_options: CookieOptions = {
    maxAge: parseInt(JWT_TOKEN_MAX_AGE_IN_HOUR) * 3600000,
    //>>> fix this: change domain
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    secure: true,
}

const sendJWTByCookie = (
    {
        res,
        token,
        cookie_otps,
    }: {
        res: Response,
        token: string,
        cookie_otps?: CookieOptions,
    }
): void => {
    res.cookie(
        Names.JWT_TOKEN_AUTH,
        token,
        cookie_otps || cookie_options
    )
}

const removeJWTByCookie = (
    {
        res,
        cookie_otps,
    }: {
        res: Response,
        cookie_otps?: CookieOptions,
    }
): void => {
    res.clearCookie(
        Names.JWT_TOKEN_AUTH,
        cookie_otps || cookie_options
    )
}

const setJWTPayload = <T extends TJwtPayload = TJwtPayload>(payload: T): T => {
    return payload
}

export {
    sendJWTByCookie,
    removeJWTByCookie,
    setJWTPayload,
}