import { ComponentType } from "react";
import { StyleSheet, View } from "react-native";

import { GradientIcon } from "./GradientIcon";
import { GradientText } from "./GradientText";
import { Text } from "./Text";
import { COLORS } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

type Props = {
  focused: boolean;
  text: string;
  iconName: any;
  icon?: ComponentType<IconProps<any>>;
};

export const TabBarIcon = ({ focused, iconName, text, icon: PropsIcon }: Props) => {
  const Icon = PropsIcon ?? Ionicons;

  if (focused) {
    return (
      <View style={styles.iconMenu}>
        <GradientIcon icon={Icon} name={iconName} size={20} />
        <GradientText style={styles.text}>{text}</GradientText>
      </View>
    );
  }

  return (
    <View style={styles.iconMenu}>
      <Icon name={iconName} size={20} color={COLORS.gray} />
      <Text style={[styles.text, { color: COLORS.gray }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconMenu: {
    alignItems: "center",
    minWidth: 60,
    gap: 4,
    marginTop: "auto",
  },
  text: {
    fontSize: 12,
  },
});
