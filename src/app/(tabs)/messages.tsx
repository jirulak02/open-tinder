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
import { Icon } from "@/components/Icon";
import { Message } from "@/components/Message";
import { DARK_GRAY, styles } from "@/styles";
import { api } from "@convex/_generated/api";

const MessagesScreen = () => {
  const profiles = useQuery(api.profiles.getAllProfiles);

  if (!profiles) {
    return (
      <ImageBackground source={IMAGE_BG} style={styles.bg}>
        <View
          style={[styles.containerMessages, { justifyContent: "center", alignItems: "center" }]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </ImageBackground>
    );
  }

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
          data={profiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Message image={item.imageUrl} name={item.name} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default MessagesScreen;
