import { Text, View } from "react-native";

import { Icon } from "./Icon";
import { DARK_GRAY, PRIMARY_COLOR, styles } from "@/styles";

type Props = {
  focused: boolean;
  iconName: any;
  text: string;
};

export const TabBarIcon = ({ focused, iconName, text }: Props) => {
  const iconFocused = focused ? PRIMARY_COLOR : DARK_GRAY;

  return (
    <View style={styles.iconMenu}>
      <Icon name={iconName} size={16} color={iconFocused} />
      <Text style={[styles.tabButtonText, { color: iconFocused }]}>{text}</Text>
    </View>
  );
};
