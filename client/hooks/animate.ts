import { useRef } from "react";
import { Animated } from "react-native";

type MovementAnimationReturnT = {
  movementAnim: Animated.Value,
  moveTo: () => Animated.CompositeAnimation,
  moveBack: () => Animated.CompositeAnimation,
  moveSequence: (delay: number) => Animated.CompositeAnimation
};

export function useMovementAnimation(
  begin: number,
  end: number,
  duration: number,
  backDuration: number = duration
): MovementAnimationReturnT {
  const movementAnim = useRef(new Animated.Value(begin)).current;

  const moveTo = () => {
    return Animated.timing(movementAnim, {
      toValue: end,
      duration,
      useNativeDriver: true,
    });
  };

  const moveBack = () => {
    return Animated.timing(movementAnim, {
      toValue: begin,
      duration: backDuration,
      useNativeDriver: true,
    });
  };

  const moveSequence = (delay: number) => {
    return Animated.sequence([moveTo(), Animated.delay(delay), moveBack()]);
  };
  return {movementAnim, moveTo, moveBack, moveSequence};
}
