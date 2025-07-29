import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import { COLORS } from "@/styles";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const GradientText = ({ text, textStyle, style }: Props) => {
  if (Platform.OS === "web") {
    return (
      <Text
        style={[
          textStyle,
          {
            background: `linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.orange} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          } as TextStyle,
        ]}
      >
        {text}
      </Text>
    );
  }

  return (
    <MaskedView
      style={style}
      maskElement={
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={[textStyle, { color: "black" }]}>{text}</Text>
        </View>
      }
    >
      <LinearGradient
        colors={[COLORS.pink, COLORS.orange]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};
