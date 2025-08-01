import { StyleSheet, View } from "react-native";

import { GradientIcon } from "./GradientIcon";
import { GradientText } from "./GradientText";
import { Text } from "./Text";
import { COLORS } from "@/styles";
import { Fontisto } from "@expo/vector-icons";

type Props = {
  isGradient?: boolean;
  color?: string;
  size?: number;
};

export const Logo = ({ color = COLORS.white, isGradient = false, size = 40 }: Props) => {
  return (
    <View style={styles.logoContainer}>
      {isGradient ? (
        <>
          <GradientIcon icon={Fontisto} name="tinder" size={size} />
          <GradientText style={[styles.logoText, { fontSize: size }]}>tinder</GradientText>
        </>
      ) : (
        <>
          <Fontisto name="tinder" size={size} color={color} />
          <Text style={[styles.logoText, { color, fontSize: size }]}>tinder</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontWeight: "bold",
  },
});
