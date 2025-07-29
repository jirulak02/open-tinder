import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ProfileItem } from "@/features/profiles/components/ProfileItem";
import { COLORS, DIMENSIONS, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

const MatchProfileScreen = () => {
  const { userId } = useLocalSearchParams<{ userId: Id<"users"> }>();

  const profile = useQuery(api.profiles.getProfileById, { userId });

  if (!profile) {
    return <LoadingIndicator />;
  }

  return (
    <View style={globalStyles.bg}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerProfile}>
          <View style={styles.top}>
            <Text style={styles.title}>{profile.name}</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image source={{ uri: profile.imageUrl }} style={styles.photo} resizeMode="cover" />
          </View>
          <ProfileItem name={profile.name} age={profile.age} description={profile.description} />
          <View style={[styles.containerProfileItem, { marginTop: 20 }]}>
            <Text style={[styles.name, { fontSize: 16, paddingBottom: 15 }]}>
              Profile Information
            </Text>
            <View style={styles.info}>
              <Ionicons name="person" color={COLORS.gray} size={15} style={styles.iconProfile} />
              <Text style={styles.infoContent}>Name: {profile.name}</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="calendar" color={COLORS.gray} size={15} style={styles.iconProfile} />
              <Text style={styles.infoContent}>Age: {profile.age} years old</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="heart" color={COLORS.pink} size={15} style={styles.iconProfile} />
              <Text style={styles.infoContent}>Looking for connections</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerProfile: {
    marginHorizontal: 0,
  },
  photo: {
    width: DIMENSIONS.width,
    height: 450,
  },
  top: {
    paddingTop: 50,
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
  containerProfileItem: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { height: 0, width: 0 },
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: COLORS.gray,
    fontSize: 15,
    textAlign: "center",
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontSize: 12,
    color: COLORS.gray,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: COLORS.gray,
    fontSize: 13,
  },
});

export default MatchProfileScreen;
