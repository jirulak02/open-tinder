import { StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { MatchesList } from "@/features/matches/components/MatchesList";
import { COLORS } from "@/styles";

const MatchesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matches</Text>
      <MatchesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    paddingHorizontal: 10,
    fontSize: 22,
    color: COLORS.gray,
  },
});

export default MatchesScreen;
