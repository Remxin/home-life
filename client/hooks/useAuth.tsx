import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import GrpcGatewayClient from '@/utils/grpcClient'

type useAuthT = {
    errorTextSetter?: (text: string) => any
}

export const useAuth = ({ errorTextSetter = () => null}: useAuthT) => {
    async function authenticateUser() {
        // const [error, response] = await GrpcGatewayClient
    }

    useEffect(() => {

    }, [])
}