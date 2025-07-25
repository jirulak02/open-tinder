import { Authenticated, ConvexReactClient, Unauthenticated, useQuery } from "convex/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { SignIn } from "@/features/auth/components/SignIn";
import { ProfileSetup } from "@/features/profile/components/ProfileSetup";
import { ConvexAuthProvider, TokenStorage } from "@convex-dev/auth/react";
import { api } from "@convex/_generated/api";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const storage = {
  getItem: (key) =>
    Platform.OS === "web" ? localStorage.getItem(key) : SecureStore.getItemAsync(key),
  setItem: (key, value) =>
    Platform.OS === "web" ? localStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
  removeItem: (key) =>
    Platform.OS === "web" ? localStorage.removeItem(key) : SecureStore.deleteItemAsync(key),
} as const satisfies TokenStorage;

const RootLayoutContent = () => {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const profile = useQuery(api.profiles.getCurrentUserProfile);

  if (loggedInUser === undefined || profile === undefined) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Authenticated>
        {!profile ? (
          <ProfileSetup />
        ) : (
          <>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </>
        )}
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </>
  );
};

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ConvexAuthProvider client={convex} storage={storage}>
      <RootLayoutContent />
    </ConvexAuthProvider>
  );
};

export default RootLayout;
