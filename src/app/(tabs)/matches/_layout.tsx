import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { COLORS } from "@/styles";

const MatchesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: styles.content }}>
      <Stack.Screen name="index" options={{ title: "Matches" }} />
      <Stack.Screen name="[userId]" />
    </Stack>
  );
};

export default MatchesLayout;

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.white,
  },
});
