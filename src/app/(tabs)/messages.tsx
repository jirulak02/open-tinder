import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import IMAGE_BG from "@/assets/images/bg.png";
import { Icon } from "@/components/Icon";
import { Message } from "@/components/Message";
import { DEMO_DATA } from "@/lib/data/demo";
import { DARK_GRAY, styles } from "@/styles";

const MessagesScreen = () => {
  return (
    <ImageBackground source={IMAGE_BG} style={styles.bg}>
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={DEMO_DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Message image={item.image} name={item.name} lastMessage={item.message} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default MessagesScreen;
