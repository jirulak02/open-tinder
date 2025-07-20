import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { CardItem } from "@/components/CardItem";
import { Icon } from "@/components/Icon";
import { DEMO_DATA } from "@/lib/data/demo";
import { DARK_GRAY, styles } from "@/styles";

const MatchesScreen = () => {
  return (
    <ImageBackground source={require("@/assets/images/bg.png")} style={styles.bg}>
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Matches</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          data={DEMO_DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CardItem image={item.image} name={item.name} isOnline={item.isOnline} hasVariant />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default MatchesScreen;
