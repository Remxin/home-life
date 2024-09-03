import { Family } from "@/grpc/family_pb"
import { User } from "@/grpc/user_pb"

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