import { Text as RNText, StyleProp, StyleSheet, TextProps, TextStyle } from "react-native";

const getFontFamily = (style: StyleProp<TextStyle>): string => {
  const flatStyle = StyleSheet.flatten(style);
  const fontWeight = flatStyle?.fontWeight?.toString();

  if (!fontWeight) return "GothamRounded-Book";

  if (["100", "200", "300", "light"].includes(fontWeight)) return "GothamRounded-Light";
  if (["500", "600", "medium"].includes(fontWeight)) return "GothamRounded-Medium";
  if (["700", "800", "900", "bold"].includes(fontWeight)) return "GothamRounded-Bold";

  return "GothamRounded-Book";
};

export const Text = (props: TextProps) => {
  const fontFamily = getFontFamily(props.style);

  return <RNText {...props} style={[props.style, { fontFamily }]} />;
};
