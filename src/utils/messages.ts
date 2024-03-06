export enum EAuthMessages {
    USER_EXISTED = 'User has been registered',
    INCORRECT_EMAIL_PASSWORD = 'Incorrect email or password',
    USER_NOT_FOUND = 'User not found',
    TOKEN_NOT_FOUND = 'Token not found',
    AUTHENTICATION_FAIL = 'Authentication fails',
    INVALID_CREDENTIALS = 'Invalid credentials',
}

export enum EValidationMessages {
    WRONG_DATE_ISO_TYPE = 'Birthday value must be in ISO 8601 type',
    SOMETHING_WENT_WRONG = 'Something went wrong in server...',
    NO_TRACE = 'No trace',
}
