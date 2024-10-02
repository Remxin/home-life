/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  dark: "#03045e",
  mediumDark: "#0077b6",
  blue: "#00b4d8",
  mediumLight: "#90e0ef",
  light: "#caf0f8",
  black: "#222222",
  brightWhite: "#fefefe",
  white: "#eeeeee",
  lightGray: "#ddddee",
  red: "#da1e28",
  yellow: "#f1c21b",
  green: "#198038",
  darkGray: "#444444"
} as const;

export type ColorsT = keyof typeof Colors
