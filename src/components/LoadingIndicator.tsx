import { ActivityIndicator, View } from "react-native";

import { COLORS, globalStyles } from "@/styles";

export const LoadingIndicator = () => {
  return (
    <View
      style={[
        globalStyles.bg,
        {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <ActivityIndicator size="large" color={COLORS.pink} />
    </View>
  );
};
