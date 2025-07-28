import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { Icon } from "@/components/Icon";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ChatItem } from "@/features/chats/components/ChatItem";
import { COLOR_GRAY, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";

const ChatsScreen = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
      <View style={globalStyles.containerMessages}>
        <View style={globalStyles.top}>
          <Text style={globalStyles.title}>Chats</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={COLOR_GRAY} size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={matches}
          keyExtractor={(item) => item._id}
          renderItem={({ item: match }) => (
            <Link
              href={{
                pathname: "/(tabs)/chats/[matchId]",
                params: { matchId: match._id },
              }}
              asChild
            >
              <TouchableOpacity>
                <ChatItem image={match.matchedProfile.imageUrl} name={match.matchedProfile.name} />
              </TouchableOpacity>
            </Link>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatsScreen;
