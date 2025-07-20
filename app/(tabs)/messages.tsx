import DEMO from "@/assets/data/demo";
import styles, { DARK_GRAY } from "@/assets/styles";
import { Icon, Message } from "@/components";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MessagesScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Message
                image={item.image}
                name={item.name}
                lastMessage={item.message}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}
