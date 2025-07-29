import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { CardItem } from "@/components/CardItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { COLORS, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";

const MatchesScreen = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
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
                  image={match.matchedProfile.imageUrl}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerMatches: {
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

export default MatchesScreen;
