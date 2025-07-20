import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/Icon";
import { Message } from "@/components/Message";
import { DEMO_DATA } from "@/lib/data/demo";
import { DARK_GRAY, styles } from "@/styles";

const MessagesScreen = () => {
  return (
    <ImageBackground source={require("@/assets/images/bg.png")} style={styles.bg}>
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
