import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { Icon } from "@/components/Icon";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ChatItem } from "@/features/chats/components/ChatItem";
import { COLORS, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";

const ChatsScreen = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Chats</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={COLORS.gray} size={20} />
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

const styles = StyleSheet.create({
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
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
});

export default ChatsScreen;
