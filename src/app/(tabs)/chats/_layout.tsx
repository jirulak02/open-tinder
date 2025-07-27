import { Stack } from "expo-router";

const ChatsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Chats" }} />
      <Stack.Screen name="[matchId]" getId={({ params }) => params?.matchId} />
    </Stack>
  );
};

export default ChatsLayout;
