import { View, Text, TextInput, StyleSheet, TextStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from './Form'

import Icon from "react-native-vector-icons/AntDesign"
import { TouchableOpacity } from 'react-native-gesture-handler'

type ComponentT = {
    name: string
    placeholder?: string
    secure?: boolean
    inputStyle?: TextStyle
    containerStyle?: TextStyle,
    secureIconButtonStyle?: TextStyle
    secureIconStyle?: TextStyle
}

const Input = ({ name, inputStyle, containerStyle, secureIconButtonStyle, secureIconStyle, secure = false, placeholder = ""}: ComponentT) => {
    const { getValue, setValue } = useForm()
    const [hide, setHide] = useState(secure)
    const value = getValue(name)

    useEffect(() => {
      console.log(hide)
    }, [hide])

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput autoCapitalize="none" placeholder={placeholder} onChangeText={(e) => setValue(name, e)} secureTextEntry={hide} style={[inputStyle, styles.input]}/>
      {secure ? <TouchableOpacity onPressIn={() => setHide(p => !p)} style={[styles.secureIconButton, secureIconButtonStyle]}>
          <Icon name="eye" style={secureIconStyle}></Icon>
      </TouchableOpacity> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },

  input: {
    borderColor: "#111",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 10,
    paddingLeft: 10
  },

  inputError: {
    borderColor: "tomato"
  },

  secureIconButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 10,
  }
})

export default Input