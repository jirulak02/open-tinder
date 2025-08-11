import { useQuery } from "convex/react";
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Text } from "@/components/Text";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { ProfileItem } from "@/features/profiles/components/ProfileItem";
import { ProfileSetup } from "@/features/profiles/components/ProfileSetup";
import { COLORS, DIMENSIONS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const profile = useQuery(api.profiles.getCurrentUserProfile);

  if (profile === undefined) {
    return <LoadingIndicator />;
  }

  if (!profile) {
    return <ProfileSetup />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.containerProfile}>
        <View style={styles.top}>
          <Text style={styles.title}>Profile</Text>
          <SignOutButton />
        </View>
        <View style={{ position: "relative", height: 450 }}>
          <FlatList
            data={profile.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(uri) => uri}
            renderItem={({ item: image }) => <Image source={{ uri: image }} style={styles.photo} />}
          />
        </View>
        <ProfileItem name={profile.name} age={profile.age} description={profile.description} />
        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Ionicons name="pencil" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton}>
            <Ionicons name="cog" size={15} color={COLORS.white} />
            <Text style={styles.textButton}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.containerProfileItem, { marginTop: 20 }]}>
          <Text style={[styles.name, { fontSize: 16, paddingBottom: 15 }]}>
            Profile Information
          </Text>
          <View style={styles.info}>
            <Ionicons name="person" color={COLORS.gray} size={15} style={styles.IoniconsProfile} />
            <Text style={styles.infoContent}>Name: {profile.name}</Text>
          </View>
          <View style={styles.info}>
            <Ionicons
              name="calendar"
              color={COLORS.gray}
              size={15}
              style={styles.IoniconsProfile}
            />
            <Text style={styles.infoContent}>Age: {profile.age} years old</Text>
          </View>
          <View style={styles.info}>
            <Ionicons name="heart" color={COLORS.pink} size={15} style={styles.IoniconsProfile} />
            <Text style={styles.infoContent}>Looking for connections</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    color: COLORS.white,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.pink,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ff7158",
    paddingHorizontal: 20,
  },
  containerProfileItem: {
    backgroundColor: COLORS.white,
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
  IoniconsProfile: {
    fontSize: 12,
    color: COLORS.gray,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: COLORS.gray,
    fontSize: 13,
  },
});

export default ProfileScreen;
