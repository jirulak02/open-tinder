import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { SignInForm } from "./SignInForm";
import { Logo } from "@/components/Logo";
import { COLORS, GRADIENT } from "@/styles";

export const SignIn = () => {
  return (
    <>
      <LinearGradient
        colors={GRADIENT.colors}
        start={GRADIENT.start}
        end={GRADIENT.end}
        style={styles.gradient}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo color={COLORS.white} />
        </View>
        <SignInForm />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    top: 100,
  },
});
