import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { moderateScale, horizontalScale, verticalScale } from "@/utils/metrics";

import PageView from "@/components/PageView";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";

// forms
import { Form } from "@/components/forms/Form";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";

// grcp
import grcpClient from "@/utils/grpcClient";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/validations/val";
import { Link } from "expo-router";

const AuthScreen = () => {
  function onSubmit() {}
  return (
    <PageView>
      <View style={styles.topSpace}>
        <Text style={styles.topText}>Welcome to</Text>
        <Text style={styles.appTitle}>Home Life</Text>
      </View>
      <View style={styles.loginForm}>
        <Svg
          width="100%"
          height="200"
          viewBox="0 0 1240 600"
          style={styles.svg}
        >
          <Path
            fill={Colors.brightWhite}
            d="M0,162L60,167.3C120,173,240,183,360,178C480,173,600,151,720,119.3C840,87,960,45,1080,44.7C1200,45,1320,87,1380,108.7L1440,130L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Svg>
        <Image
          style={styles.penguinImage}
          source={require("@/assets/images/penguin.png")}
        />
        <Form values={["email", "password"]} submit={onSubmit}>
          <Input
            name="email"
            inputStyle={styles.input}
            placeholder="Email"
            validationFunction={validateEmail}
          />
          <Input
            name="name"
            inputStyle={styles.input}
            placeholder="Name"
            validationFunction={validateUsername}
          />
          <Input
            name="password"
            secure={true}
            inputStyle={styles.input}
            placeholder="Password"
            validationFunction={validatePassword}
          />
          <Button text="Create Account" buttonStyle={styles.loginButton} />
        </Form>
        <Link href="/(auth)/" style={styles.pageLink}>
          Already have an account
        </Link>
      </View>
    </PageView>
  );
};

const styles = StyleSheet.create({
  topSpace: {
    flex: 1,
    padding: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  topText: {
    fontSize: horizontalScale(20),
    color: Colors.dark,
  },
  appTitle: {
    fontSize: horizontalScale(30),
    color: Colors.dark,
    fontWeight: "bold",
  },
  loginForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(12),
    backgroundColor: Colors.brightWhite,
  },
  svg: {
    position: "absolute",
    top: "-20%",
    height: "50%",
  },
  penguinImage: {
    position: "absolute",
    width: moderateScale(160),
    height: moderateScale(160),
    top: -120,
    left: "2%",
  },
  input: {
    width: horizontalScale(220),
    height: horizontalScale(40),
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
  },
  inputText: {
    color: Colors.black,
  },
  loginButton: {
    width: horizontalScale(160),
    height: horizontalScale(40),
    borderRadius: 15,
  },
  pageLink: {
    fontSize: horizontalScale(10),
    color: Colors.dark,
  },
});

export default AuthScreen;