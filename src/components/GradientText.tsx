import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Platform, StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { COLORS, GRADIENT } from "@/styles";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = TextProps & {
  children: ReactNode;
};

export const GradientText = ({ style, children, ...rest }: Props) => {
  if (Platform.OS === "web") {
    return (
      <Text
        {...rest}
        style={[
          style,
          {
            backgroundImage: `linear-gradient(${GRADIENT.angle}deg, ${GRADIENT.colors.join(", ")})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          } as TextStyle,
        ]}
      >
        {children}
      </Text>
    );
  }

  return (
    <MaskedView
      maskElement={
        <Text {...rest} style={[style, styles.maskText]}>
          {children}
        </Text>
      }
    >
      <LinearGradient colors={GRADIENT.colors} start={GRADIENT.start} end={GRADIENT.end}>
        {/* The gradient needs dimensions, which we can get around with this transparent text */}
        <Text {...rest} style={[style, styles.hiddenText]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskText: {
    color: COLORS.black,
  },
  hiddenText: {
    opacity: 0,
  },
});
