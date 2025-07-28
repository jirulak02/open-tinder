import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { CardItem } from "@/components/CardItem";
import { Icon } from "@/components/Icon";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { COLOR_GRAY, globalStyles } from "@/styles";
import { api } from "@convex/_generated/api";

const MatchesScreen = () => {
  const matches = useQuery(api.matches.getMatches);

  if (!matches) {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground source={IMAGE_BG} style={globalStyles.bg}>
      <View style={globalStyles.containerMatches}>
        <View style={globalStyles.top}>
          <Text style={globalStyles.title}>Matches</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={COLOR_GRAY} size={20} />
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

export default MatchesScreen;
