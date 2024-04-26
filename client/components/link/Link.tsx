import { View, Text, TouchableNativeFeedback, TextStyle } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from "@react-navigation/native"


type ComponentT = {
    destination: string
    text: string
    styles?: TextStyle
}

const Link = ({ destination, text, styles }: ComponentT) => {
    const navigation = useNavigation()
  return (
    // @ts-ignore
    <TouchableNativeFeedback style={styles} onPress={() => navigation.navigate(destination)}>
      <Text>{ text }</Text>
    </TouchableNativeFeedback>
  )
}

export default Link