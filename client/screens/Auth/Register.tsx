import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

// components
import { Form } from '../../components/form/Form'
import Input from "../../components/form/Input"
import Button from '../../components/form/Button'
import Link from '../../components/link/Link'

//  constants 
import appConstants from '../../constants/appConstants'
import colors from '../../constants/colors'

async function submit() {

}
const RegisterScreen = () => {
  return (
    <Form values={["name", "email", "password"]} submit={submit}>
        <View style={styles.container}>
          <Text style={styles.title}>{appConstants.name}</Text>
          <Image source={require("../../assets/images/piggy.png")} style={styles.image}/>
          <Input name="name" placeholder='Enter name' inputStyle={styles.input} containerStyle={styles.inputContainer}/>
          <Input name="email" placeholder='Enter email' inputStyle={styles.input} containerStyle={styles.inputContainer}/>
          <Input name="password" placeholder='Enter password' secure={true} inputStyle={styles.input} containerStyle={styles.inputContainer} secureIconButtonStyle={styles.secureIconButton} secureIconStyle={styles.secureIcon}/>
          <Button text="Login" buttonStyle={styles.button}/>
          <Link text="I have an account" destination='login'/>
        </View>
      </Form>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    color: colors.pink
  },

  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: colors.beige
  },
  image: {
    width: 200,
    height: 200
  },
  inputContainer: {
    width: 200,
    height: 40,
    marginBottom: 20
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: colors.white
  },

  secureIcon: {
    fontSize: 20,
  },

  secureIconButton: {
    width: 40,
    height: 40,
    top: -20,
    right: 5
  },

  button: {
    width: 200,
    height: 40
  }
})

export default RegisterScreen