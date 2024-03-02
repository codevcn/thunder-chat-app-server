import type { TCustomExceptionPayload } from '../types'

export interface IExceptionValidationService<T> {
    validateException: (exception: T) => TCustomExceptionPayload
}
