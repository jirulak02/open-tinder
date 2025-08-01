import { ActivityIndicator, StyleSheet, View } from "react-native";

import { COLORS } from "@/styles";

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.pink} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
