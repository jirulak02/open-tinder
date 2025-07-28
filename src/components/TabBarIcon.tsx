import { Text, View } from "react-native";

import { Icon } from "./Icon";
import { COLOR_GRAY, COLOR_PINK, globalStyles } from "@/styles";

type Props = {
  focused: boolean;
  iconName: any;
  text: string;
};

export const TabBarIcon = ({ focused, iconName, text }: Props) => {
  const iconFocused = focused ? COLOR_PINK : COLOR_GRAY;

  return (
    <View style={globalStyles.iconMenu}>
      <Icon name={iconName} size={16} color={iconFocused} />
      <Text style={[globalStyles.tabButtonText, { color: iconFocused }]}>{text}</Text>
    </View>
  );
};
