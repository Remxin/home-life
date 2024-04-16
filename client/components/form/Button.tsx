import { Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native'
import React from 'react'

// hooks
import { useForm } from './Form'

// constants
import colors from '../../constants/colors'


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
    backgroundColor: colors.pink,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: colors.white
  }
})

export default OpacityClickable