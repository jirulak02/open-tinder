import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { ChatItem } from "./ChatItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";

export const ChatsList = () => {
  const chats = useQuery(api.chats.getChats);

  if (!chats) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item._id}
      renderItem={({ item: match }) => (
        <View>
          <Link
            href={{
              pathname: "/(tabs)/chats/[matchId]",
              params: { matchId: match._id },
            }}
            asChild
          >
            <TouchableOpacity>
              <ChatItem profile={match.matchedProfile} matchId={match._id} />
            </TouchableOpacity>
          </Link>
          <View style={styles.divider} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.subtleGray,
  },
});
