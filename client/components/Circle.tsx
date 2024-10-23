import { View, Text, StyleSheet, TextStyle } from 'react-native'
import React from 'react'
import { Colors, ColorsT } from '@/constants/colors'

type CircleT = {
    children?: React.ReactNode | React.ReactNode[]
    size: number
    color: ColorsT
    style?: TextStyle
}

const Circle = ({ size, color, children, style }: CircleT) => {
  return (
    <View style={[{
        width: size,
        height: size,
        backgroundColor: Colors[color],
        borderRadius: size / 2
    }, style]}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    circle: {

    }
})

export default Circle