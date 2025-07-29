import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GradientIcon } from "./GradientIcon";
import { GradientText } from "./GradientText";
import { COLORS } from "@/styles";
import { Ionicons } from "@expo/vector-icons";

type IconProps = {
  color: string;
  size: number;
};

type Props = {
  focused: boolean;
  text: string;
  icon?: ({ color, size }: IconProps) => ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
};

export const TabBarIcon = ({ focused, iconName, text, icon: PropsIcon }: Props) => {
  if (focused) {
    const iconElement = PropsIcon ? (
      <PropsIcon size={16} color={COLORS.pink} />
    ) : (
      <Ionicons name={iconName} size={16} color={COLORS.pink} />
    );

    return (
      <View style={styles.iconMenu}>
        <GradientIcon icon={iconElement} style={{ width: 16, height: 16 }} />
        <GradientText style={styles.text}>{text}</GradientText>
      </View>
    );
  }

  return (
    <View style={styles.iconMenu}>
      {PropsIcon ? (
        <PropsIcon size={16} color={COLORS.gray} />
      ) : (
        <Ionicons name={iconName} size={16} color={COLORS.gray} />
      )}
      <Text style={[styles.text, { color: COLORS.gray }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconMenu: {
    alignItems: "center",
    minWidth: 60,
  },
  text: {
    textTransform: "uppercase",
    fontSize: 12,
  },
});
