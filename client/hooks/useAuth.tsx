import { View, Text } from 'react-native'
import React, { useEffect, Dispatch } from 'react'
import GrpcGatewayClient from '@/utils/grpcClient'
import HomeLifeAsyncStorage from '@/utils/asyncStorage'
import { useRouter } from 'expo-router'

type useAuthT = {
    errorTextSetter?: Dispatch<string>
}

export const useAuth = ({ errorTextSetter = () => null}: useAuthT) => {
    const router = useRouter()

    async function authenticateUser() {
        const [error, response] = await GrpcGatewayClient.renewAccessToken()
        if (error) {
            errorTextSetter(error.message)
            return
        }
        await HomeLifeAsyncStorage.setData("access_token", response.access_token)
        await HomeLifeAsyncStorage.setData("access_token_expires_at", response.access_token_expires_at)
        await HomeLifeAsyncStorage.setData("refresh_token", response.refresh_token)
        await HomeLifeAsyncStorage.setData("refresh_token_expires_at", response.refresh_token_expires_at)
        await HomeLifeAsyncStorage.setData("permission_token", response.permission_token)
        
        router.replace("/(auth)/getfamily")
    }

    useEffect(() => {
        authenticateUser()
    }, [])
}