import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { COLORS, GRADIENT } from "@/styles";

export const GradientButton = ({ children, disabled, ...rest }: TouchableOpacityProps) => {
  if (disabled) {
    return (
      <TouchableOpacity
        {...rest}
        disabled={disabled}
        style={[styles.button, styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity {...rest} disabled={disabled}>
      <LinearGradient
        colors={GRADIENT.colors}
        start={GRADIENT.start}
        end={GRADIENT.end}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
