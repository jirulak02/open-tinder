import { useQuery } from "convex/react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { Icon } from "@/components/Icon";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ProfileItem } from "@/components/ProfileItem";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { ProfileSetup } from "@/features/profile/components/ProfileSetup";
import { DARK_GRAY, PRIMARY_COLOR, WHITE, styles } from "@/styles";
import { api } from "@convex/_generated/api";

const ProfileScreen = () => {
  const profile = useQuery(api.profiles.getCurrentUserProfile);

  if (profile === undefined) {
    return <LoadingIndicator />;
  }

  if (!profile) {
    return (
      <ImageBackground source={IMAGE_BG} style={styles.bg}>
        <ProfileSetup />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={IMAGE_BG} style={styles.bg}>
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
              <Icon name="pencil" size={20} color={WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton}>
              <Icon name="cog" size={15} color={WHITE} />
              <Text style={styles.textButton}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.containerProfileItem, { marginTop: 20 }]}>
            <Text style={[styles.name, { fontSize: 16, paddingBottom: 15 }]}>
              Profile Information
            </Text>

            <View style={styles.info}>
              <Icon name="person" color={DARK_GRAY} size={15} style={styles.iconProfile} />
              <Text style={styles.infoContent}>Name: {profile.name}</Text>
            </View>
            <View style={styles.info}>
              <Icon name="calendar" color={DARK_GRAY} size={15} style={styles.iconProfile} />
              <Text style={styles.infoContent}>Age: {profile.age} years old</Text>
            </View>
            <View style={styles.info}>
              <Icon name="heart" color={PRIMARY_COLOR} size={15} style={styles.iconProfile} />
              <Text style={styles.infoContent}>Looking for connections</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
