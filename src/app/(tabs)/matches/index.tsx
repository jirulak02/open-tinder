import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { CardItem } from "@/components/CardItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const MatchesScreen = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.containerMatches}>
      <View style={styles.top}>
        <Text style={styles.title}>Matches</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" color={COLORS.gray} size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={1}
        data={matches}
        keyExtractor={(match) => match._id}
        renderItem={({ item: match }) => (
          <Link
            href={{
              pathname: "/(tabs)/matches/[userId]",
              params: {
                userId: match.matchedProfile.userId,
              },
            }}
            asChild
          >
            <TouchableOpacity>
              <CardItem
                images={match.matchedProfile.images}
                name={match.matchedProfile.name}
                age={match.matchedProfile.age}
                description={match.matchedProfile.description}
                hasVariant
              />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMatches: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },
  top: {
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

export default MatchesScreen;
