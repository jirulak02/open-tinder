import { LinearGradient } from "expo-linear-gradient";
import { ReactElement } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

import { COLORS } from "@/styles";
import MaskedView from "@react-native-masked-view/masked-view";

type Props = {
  icon: ReactElement;
  style?: StyleProp<ViewStyle>;
};

export const GradientIcon = ({ icon: Icon, style }: Props) => {
  if (Platform.OS === "web") {
    return Icon;
  }

  return (
    <MaskedView
      style={style}
      maskElement={
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>{Icon}</View>
      }
    >
      <LinearGradient
        colors={[COLORS.pink, COLORS.orange]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};
