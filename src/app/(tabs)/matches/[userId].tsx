import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { Icon } from "@/components/Icon";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ProfileItem } from "@/features/profiles/components/ProfileItem";
import { COLOR_GRAY, COLOR_PINK, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

const MatchProfileScreen = () => {
  const { userId } = useLocalSearchParams<{ userId: Id<"users"> }>();

  const profile = useQuery(api.profiles.getProfileById, { userId });

  if (!profile) {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
      <ScrollView style={{ flex: 1 }}>
        <View style={globalStyles.containerProfile}>
          <View style={globalStyles.top}>
            <Text style={globalStyles.title}>{profile.name}</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Image
              source={{ uri: profile.imageUrl }}
              style={globalStyles.photo}
              resizeMode="cover"
            />
          </View>
          <ProfileItem name={profile.name} age={profile.age} description={profile.description} />
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

export default MatchProfileScreen;
