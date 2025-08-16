import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { COLORS } from "@/styles";

const ChatsLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ headerShown: false, contentStyle: styles.content }}
    >
      <Stack.Screen name="index" options={{ title: "Chats" }} />
      <Stack.Screen name="[matchId]" />
    </Stack>
  );
};

export default ChatsLayout;

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.white,
  },
});
