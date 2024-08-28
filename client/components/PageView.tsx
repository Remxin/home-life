import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type PageViewProps = {
    children: JSX.Element | JSX.Element[]
}
const PageView = ({ children }: PageViewProps) => {
  return (
    <View style={{
        height: "100%",
        width: "100%",
        backgroundColor: Colors.light,
    }}>
        {children}
    </View>
  )
}


export default PageView