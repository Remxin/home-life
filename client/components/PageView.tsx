import { View, Text } from 'react-native'
import React from 'react'
import { Colors, ColorsT } from '@/constants/Colors'

type PageViewProps = {
    children: JSX.Element | JSX.Element[]
    color: ColorsT
}
const PageView = ({ children, color = "light" }: PageViewProps) => {
  return (
    <View style={{
        height: "100%",
        width: "100%",
        backgroundColor: Colors[color],
    }}>
        {children}
    </View>
  )
}


export default PageView