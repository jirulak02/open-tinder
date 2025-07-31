import { StyleSheet, Text, View } from "react-native";

import { GradientIcon } from "./GradientIcon";
import { GradientText } from "./GradientText";
import { COLORS } from "@/styles";
import { Fontisto } from "@expo/vector-icons";

type Props = {
  isGradient?: boolean;
  color?: string;
};

export const Logo = ({ color = COLORS.white, isGradient = false }: Props) => {
  return (
    <View style={styles.logoContainer}>
      {isGradient ? (
        <>
          <GradientIcon icon={Fontisto} name="tinder" size={40} />
          <GradientText style={styles.logoText}>tinder</GradientText>
        </>
      ) : (
        <>
          <Fontisto name="tinder" size={40} color={color} />
          <Text style={[styles.logoText, { color }]}>tinder</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
