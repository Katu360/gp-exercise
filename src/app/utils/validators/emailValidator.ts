
export const emailValidator = (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')