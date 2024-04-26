import { View, Text, TextStyle } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'


type ComponentT = {
    children: React.ReactNode | React.ReactNode[]
    onPress: () => void
    styles?: TextStyle
}

const Button = ({ children, onPress, styles}: ComponentT) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  )
}

export default Button