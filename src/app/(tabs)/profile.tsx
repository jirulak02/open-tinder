import { useQuery } from "convex/react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { ProfileItem } from "@/features/profiles/components/ProfileItem";
import { ProfileSetup } from "@/features/profiles/components/ProfileSetup";
import { COLORS, DIMENSIONS, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const profile = useQuery(api.profiles.getCurrentUserProfile);

  if (profile === undefined) {
    return <LoadingIndicator />;
  }

  if (!profile) {
    return (
      <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
        <ProfileSetup />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerProfile}>
          <View style={styles.top}>
            <Text style={styles.title}>Profile</Text>
            <SignOutButton />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image source={{ uri: profile.imageUrl }} style={styles.photo} resizeMode="cover" />
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
              <Ionicons
                name="person"
                color={COLORS.gray}
                size={15}
                style={styles.IoniconsProfile}
              />
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
    </ImageBackground>
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
