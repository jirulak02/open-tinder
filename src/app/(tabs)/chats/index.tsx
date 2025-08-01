import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Text } from "@/components/Text";
import { ChatItem } from "@/features/chats/components/ChatItem";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const ChatsScreen = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.containerMessages}>
      <View style={styles.top}>
        <Text style={styles.title}>Chats</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" color={COLORS.gray} size={20} />
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
              <ChatItem image={match.matchedProfile.images[0]} name={match.matchedProfile.name} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
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
