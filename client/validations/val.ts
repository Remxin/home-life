const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const usernameRegex = /`^[a-zA-Z\s]+$`/

export function validateString(value: string, min: number, max: number): string {
    if (value.length < min || value.length > max) return `should have length between ${min} and ${max}`
    return ""
}

export function validateEmail(value: string): string {
    if (!emailRegex.test(value)) return "not a valid email"
    return validateString(value, 3, 200)
}

export function validatePassword(value: string): string {
    return validateString(value, 6, 100)
}

export function validateUsername(value: string): string {
    if (!usernameRegex.test(value)) return "user name should contain only letters, capital letters and spaces"
    return validateString(value, 3, 50)
}