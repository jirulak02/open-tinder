import { Stack } from "expo-router";

const MatchesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Matches" }} />
      <Stack.Screen name="[userId]" />
    </Stack>
  );
};

export default MatchesLayout;
