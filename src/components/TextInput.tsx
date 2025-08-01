import { TextInput as RNTextInput, TextInputProps } from "react-native";

import { getFontFamily } from "@/utils";

export const TextInput = (props: TextInputProps) => {
  const fontFamily = getFontFamily(props.style);

  return <RNTextInput {...props} style={[props.style, { fontFamily }]} />;
};
