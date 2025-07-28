import { useQuery } from "convex/react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { Icon } from "@/components/Icon";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { SignOutButton } from "@/features/auth/components/SignOutButton";
import { ProfileItem } from "@/features/profiles/components/ProfileItem";
import { ProfileSetup } from "@/features/profiles/components/ProfileSetup";
import { COLOR_GRAY, COLOR_PINK, COLOR_WHITE, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";

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
        <View style={globalStyles.containerProfile}>
          <View style={globalStyles.top}>
            <Text style={globalStyles.title}>Profile</Text>
            <SignOutButton />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              source={{ uri: profile.imageUrl }}
              style={globalStyles.photo}
              resizeMode="cover"
            />
          </View>
          <ProfileItem name={profile.name} age={profile.age} description={profile.description} />
          <View style={globalStyles.actionsProfile}>
            <TouchableOpacity style={globalStyles.circledButton}>
              <Icon name="pencil" size={20} color={COLOR_WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.roundedButton}>
              <Icon name="cog" size={15} color={COLOR_WHITE} />
              <Text style={globalStyles.textButton}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={[globalStyles.containerProfileItem, { marginTop: 20 }]}>
            <Text style={[globalStyles.name, { fontSize: 16, paddingBottom: 15 }]}>
              Profile Information
            </Text>
            <View style={globalStyles.info}>
              <Icon name="person" color={COLOR_GRAY} size={15} style={globalStyles.iconProfile} />
              <Text style={globalStyles.infoContent}>Name: {profile.name}</Text>
            </View>
            <View style={globalStyles.info}>
              <Icon name="calendar" color={COLOR_GRAY} size={15} style={globalStyles.iconProfile} />
              <Text style={globalStyles.infoContent}>Age: {profile.age} years old</Text>
            </View>
            <View style={globalStyles.info}>
              <Icon name="heart" color={COLOR_PINK} size={15} style={globalStyles.iconProfile} />
              <Text style={globalStyles.infoContent}>Looking for connections</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
