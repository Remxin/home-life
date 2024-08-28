import { Text, TouchableOpacity, StyleSheet, TextStyle } from "react-native";
import React from "react";

// constants
import { Colors } from "@/constants/Colors";

type ComponentT = {
  text: string;
  onPress: (...args: any) => any;
  buttonStyle?: TextStyle;
  textStyle?: TextStyle;
};

const SimpleButton = ({
  text,
  buttonStyle,
  textStyle,
  onPress,
}: ComponentT) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.mediumDark,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: Colors.white,
  },
});

export default SimpleButton;
