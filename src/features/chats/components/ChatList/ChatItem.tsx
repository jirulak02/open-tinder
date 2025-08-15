import { useQuery } from "convex/react";
import { Image, StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { DIMENSIONS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Profile } from "@convex/profiles";

type Props = {
  profile: Profile;
  matchId: Id<"matches">;
};

export const ChatItem = ({ profile, matchId }: Props) => {
  const lastMessage = useQuery(api.messages.getLastMessage, {
    matchId,
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.images[0] }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
          {lastMessage?.content ?? "..."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    width: DIMENSIONS.width - 85,
  },
});
