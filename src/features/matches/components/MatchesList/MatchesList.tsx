import { useQuery } from "convex/react";
import { FlatList, StyleSheet, View } from "react-native";

import { MatchItem } from "./MatchItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { NoResults } from "@/components/NoResults";
import { DIMENSIONS } from "@/styles";
import { api } from "@convex/_generated/api";

export const MatchesList = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  if (matches.length === 0) {
    return <NoResults text="You don't have any matches yet." />;
  }

  return (
    <FlatList
      numColumns={2}
      data={matches}
      keyExtractor={(match) => match._id}
      renderItem={({ item: match }) => (
        <View style={styles.item}>
          <MatchItem matchId={match._id} profile={match.matchedProfile} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    width: (DIMENSIONS.width - 20) / 2,
  },
});
