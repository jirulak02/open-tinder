import { Text as RNText, TextProps } from "react-native";

import { getFontFamily } from "@/utils/reactNative";

export const Text = (props: TextProps) => {
  const fontFamily = getFontFamily(props.style);

  return <RNText {...props} style={[props.style, { fontFamily }]} />;
};
