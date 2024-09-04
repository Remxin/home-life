import { View, Text, StyleSheet, Animated } from "react-native";
import { Dispatch, useEffect } from "react";
import { Colors } from "@/constants/Colors";

import { verticalScale } from "@/utils/metrics";
import { useMovementAnimation } from "@/hooks/animate";

type ErrorTopModalT = {
  visible: boolean;
  text: string;
  setVisible: Dispatch<boolean>;
  type?: "error" | "warning" | "success"
};

const MOVEMENT_DURATION = 300;

// TODO: set modal color corresponding to it's type
function getColor(type: ErrorTopModalT["type"]) {
  switch (type) {
    case "error": return Colors.red
    // case "warning" return Colors.
  }
}

const ErrorTopModal = ({ visible, setVisible, text }: ErrorTopModalT) => {
  const { movementAnim, moveSequence } = useMovementAnimation(
    -60,
    60,
    MOVEMENT_DURATION
  );

  useEffect(() => {
    if (!visible) return;
    moveSequence(5000).start(() => {
      setVisible(false);
    });
  }, [visible]);



  if (!visible) return <></>;
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: movementAnim }] }]}
    >
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "80%",
    left: "10%",
    height: verticalScale(60),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.red,
    borderRadius: verticalScale(8)
  },
  text: {
    color: Colors.white,
    fontSize: verticalScale(20)
  },
});

export default ErrorTopModal;
