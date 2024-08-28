import { Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native'
import React from 'react'

// hooks
import { useForm } from './Form'

// constants
import { Colors } from "@/constants/Colors"


type ComponentT = {
  text: string
  buttonStyle?: TextStyle,
  textStyle?: TextStyle
}

const OpacityClickable = ({ text, buttonStyle, textStyle}: ComponentT) => {
  const { submit } = useForm()

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.button, buttonStyle]} onPress={submit}><Text style={[styles.buttonText, textStyle]}>{text}</Text></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.mediumDark,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: Colors.white
  }
})

export default OpacityClickable