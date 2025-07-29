import { LinearGradient } from "expo-linear-gradient";
import { ComponentType } from "react";
import { Platform, StyleSheet, TextStyle } from "react-native";

import { COLORS } from "@/styles";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import MaskedView from "@react-native-masked-view/masked-view";

type Props<T extends string> = Omit<IconProps<T>, "color"> & {
  icon: ComponentType<IconProps<T>>;
};

export const GradientIcon = <T extends string>({
  icon: Icon,
  name,
  size,
  style,
  ...iconRest
}: Props<T>) => {
  if (Platform.OS === "web") {
    return (
      <Icon
        {...iconRest}
        name={name}
        size={size}
        style={[
          style,
          {
            backgroundImage: `linear-gradient(45deg, ${COLORS.pink}, ${COLORS.orange})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          } as TextStyle,
        ]}
      />
    );
  }

  return (
    <MaskedView
      maskElement={
        <Icon {...iconRest} name={name} size={size} color={COLORS.black} style={style} />
      }
    >
      <LinearGradient
        colors={[COLORS.pink, COLORS.orange]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        {/* The gradient needs dimensions, which we can get around with this transparent icon */}
        <Icon {...iconRest} name={name} size={size} style={[style, styles.hiddenIcon]} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  hiddenIcon: {
    opacity: 0,
  },
});
