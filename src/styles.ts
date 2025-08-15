import { Dimensions } from "react-native";

export const COLORS = {
  pink: "#fd2b7b",
  orange: "#ff7158",
  white: "#ffffff",
  black: "#000000",
  blue: "#3b82f6",
  red: "#ef4444",
  gray: "#424242",
  lightGray: "#9ca3af",
  subtleGray: "#e5e5e5",
} as const;

export const GRADIENT = {
  colors: [COLORS.pink, COLORS.orange],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
  angle: 45,
} as const;

export const DIMENSIONS = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
} as const;
