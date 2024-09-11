export type User = {
    id: string
    full_name: string
    email: string
    is_verified: boolean
    password_changed_at: string
    created_at: string
}

export type Family = {
    id: string
    name: string
    owner_id: string
    created_at: string
}