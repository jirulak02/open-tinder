import { useQuery } from "convex/react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Text } from "@/components/Text";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { ProfileImages } from "@/features/profiles/components/ProfileImages";
import { ProfileInfo } from "@/features/profiles/components/ProfileInfo";
import { ProfileSetup } from "@/features/profiles/components/ProfileSetup";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";

const ProfileScreen = () => {
  const profile = useQuery(api.profiles.getCurrentUserProfile);

  if (profile === undefined) {
    return <LoadingIndicator />;
  }

  if (!profile) {
    return <ProfileSetup />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Profile</Text>
        <SignOutButton />
      </View>
      <ScrollView>
        <ProfileImages profile={profile} />
        <Card style={styles.infoCard}>
          <ProfileInfo profile={profile} />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    paddingBottom: 10,
    fontSize: 22,
    color: COLORS.gray,
  },
  infoCard: {
    marginHorizontal: 20,
    marginTop: -65,
  },
});

export default ProfileScreen;
