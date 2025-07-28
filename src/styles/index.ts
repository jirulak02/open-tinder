import { Dimensions, StyleSheet } from "react-native";

export const COLORS = {
  pink: "#fd2b7b",
  orange: "#ff7158",
  white: "#ffffff",
  gray: "#424242",
  black: "#000000",
} as const;

export const DIMENSIONS = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
} as const;

export const globalStyles = StyleSheet.create({
  bg: {
    flex: 1,
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    backgroundColor: COLORS.white,
  },
});
