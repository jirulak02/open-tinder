import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { Card } from "@/components/Card";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Text } from "@/components/Text";
import { ProfileImages } from "@/features/profiles/components/ProfileImages";
import { ProfileInfo } from "@/features/profiles/components/ProfileInfo";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

const UserProfileScreen = () => {
  const { userId } = useLocalSearchParams<{ userId: Id<"users"> }>();

  const profile = useQuery(api.profiles.getProfileById, { userId });

  if (!profile) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{profile.name}</Text>
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
    marginHorizontal: 10,
    marginTop: -60,
  },
});

export default UserProfileScreen;
