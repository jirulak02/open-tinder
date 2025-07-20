import DEMO from "@/assets/data/demo";
import styles, { DARK_GRAY } from "@/assets/styles";
import { CardItem, Icon } from "@/components";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MatchesScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMatches}>
        <View style={styles.top}>
          <Text style={styles.title}>Matches</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CardItem
                image={item.image}
                name={item.name}
                isOnline={item.isOnline}
                hasVariant
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}
