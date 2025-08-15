import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { COLORS } from "@/styles";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ style, children }: Props) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { height: 5, width: 0 },
  },
});
