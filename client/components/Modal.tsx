import { View, Text, StyleSheet, DimensionValue, GestureResponderEvent, TextStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

type ModalT = {
  visible: boolean;
  setVisible: (...arg: any) => void;
  width?: DimensionValue;
  height?: DimensionValue;
  children: React.ReactNode | React.ReactNode[]
  style?: TextStyle
};

const Modal = ({ visible, setVisible, style, children, height = 300, width = 300 }: ModalT) => {
  function close(e: GestureResponderEvent) {
    if (e.currentTarget === e.target) setVisible(false)
  }
  if (!visible) return <></>;
  return (
    <View style={styles.parent}>
      <View style={styles.background} onTouchStart={close}></View>
      <View style={[styles.modal, { height: height, width }, style]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.6,
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    opacity: 1,
    borderRadius: 10
  },
});

export default Modal;
