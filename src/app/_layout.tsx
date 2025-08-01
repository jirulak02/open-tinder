import { Authenticated, ConvexReactClient, Unauthenticated, useQuery } from "convex/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Logo } from "@/components/Logo";
import { SignIn } from "@/features/auth/components/SignIn";
import { ProfileSetup } from "@/features/profiles/components/ProfileSetup";
import { COLORS, DIMENSIONS } from "@/styles";
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
    <View style={styles.bg}>
      <Authenticated>
        {!profile ? (
          <ProfileSetup />
        ) : (
          <>
            <Stack
              screenOptions={{
                contentStyle: styles.content,
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => null,
                headerTitle: () => (
                  <View style={styles.header}>
                    <Logo isGradient size={32} />
                  </View>
                ),
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </>
        )}
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </View>
  );
};

const RootLayout = () => {
  const [loaded] = useFonts({
    "GothamRounded-Light": require("@/assets/fonts/GothamRounded/gothamrnd_light.otf"),
    "GothamRounded-Book": require("@/assets/fonts/GothamRounded/gothamrnd_book.otf"),
    "GothamRounded-Medium": require("@/assets/fonts/GothamRounded/gothamrnd_medium.otf"),
    "GothamRounded-Bold": require("@/assets/fonts/GothamRounded/gothamrnd_bold.otf"),
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

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  header: {
    paddingVertical: 4,
  },
  content: {
    backgroundColor: COLORS.white,
  },
});
