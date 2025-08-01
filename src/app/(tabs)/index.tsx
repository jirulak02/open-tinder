import { useQuery } from "convex/react";
import { StyleSheet, View } from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { SwipeStack } from "@/features/matches/components/SwipeStack";
import { api } from "@convex/_generated/api";

const HomeScreen = () => {
  const potentialMatches = useQuery(api.profiles.getPotentialMatches);

  if (!potentialMatches) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SwipeStack potentialMatches={potentialMatches} />
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
});
