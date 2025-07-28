import { StyleSheet, Text, View } from "react-native";

import { Icon } from "./Icon";
import { COLORS } from "@/styles";

type Props = {
  focused: boolean;
  iconName: any;
  text: string;
};

export const TabBarIcon = ({ focused, iconName, text }: Props) => {
  const iconFocused = focused ? COLORS.pink : COLORS.gray;

  return (
    <View style={styles.iconMenu}>
      <Icon name={iconName} size={16} color={iconFocused} />
      <Text style={[styles.tabButtonText, { color: iconFocused }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabButtonText: {
    textTransform: "uppercase",
    fontSize: 12,
  },
  iconMenu: {
    alignItems: "center",
    minWidth: 60,
  },
});
