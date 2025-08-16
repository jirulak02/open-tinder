import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Text } from "@/components/Text";
import { COLORS, GRADIENT } from "@/styles";

export const GradientButton = ({ children, disabled, ...rest }: TouchableOpacityProps) => {
  if (disabled) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, styles.buttonDisabled]}
        {...rest}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity disabled={disabled} {...rest}>
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
