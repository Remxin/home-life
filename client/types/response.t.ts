import { User, Family } from "./db.t"

export type LoginUserResponse = {
    access_token: string
    access_token_expires_at: string
    refresh_token: string
    refresh_token_expires_at: string
    user: User
    session_id: string
    permissions_token?: string
}

export type GetFamilyResponse = {
    family: Family,
    members: User[]
}

export type CreateFamilyResponse = {
    family: Family,
    permission_token: string
}