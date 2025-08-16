import { useQuery } from "convex/react";
import { Link, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { BackButton } from "@/components/BackButton";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

type Props = {
  matchId: Id<"matches">;
};

export const ChatHeader = ({ matchId }: Props) => {
  const { from } = useLocalSearchParams<{ from?: string }>();

  const profile = useQuery(api.profiles.getProfileByMatchId, { matchId });

  if (!profile) {
    return (
      <View style={styles.loading}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={styles.top}>
      <BackButton fromHref={from} />
      <Link
        href={{
          pathname: "/(tabs)/user/[userId]",
          params: {
            userId: profile.userId,
            from: JSON.stringify({
              pathname: "/(tabs)/chats/[matchId]",
              params: { matchId },
            }),
          },
        }}
      >
        <View style={styles.link}>
          <Image source={{ uri: profile.images[0] }} style={styles.avatar} />
          <Text style={styles.title}>{profile.name}</Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    height: 50,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.subtleGray,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.subtleGray,
  },
  title: {
    fontSize: 22,
    color: COLORS.gray,
  },
});
