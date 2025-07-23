import { useQuery } from "convex/react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { CardItem } from "@/components/CardItem";
import { Icon } from "@/components/Icon";
import { DARK_GRAY, styles } from "@/styles";
import { api } from "@convex/_generated/api";

const MatchesScreen = () => {
  const profiles = useQuery(api.profiles.getAllProfiles);

  if (!profiles) {
    return (
      <ImageBackground source={IMAGE_BG} style={styles.bg}>
        <View style={[styles.containerMatches, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={IMAGE_BG} style={styles.bg}>
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Matches</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={1}
          data={profiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CardItem
                image={item.imageUrl}
                name={item.name}
                age={item.age}
                description={item.description}
                hasVariant
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default MatchesScreen;
