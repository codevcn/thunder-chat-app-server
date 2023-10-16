
// Exclude some fields from a instance of model
const excl_fields = <T, Key extends keyof T>(
    data: NonNullable<T>,
    fields: Key[]
): Omit<T, Key> => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !fields.includes(key as Key))
    ) as Omit<T, Key>
}

export {
    excl_fields,
}