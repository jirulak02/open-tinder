import { StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { ChatList } from "@/features/chats/components/ChatList";
import { COLORS } from "@/styles";

const ChatsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <ChatList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: COLORS.gray,
  },
});

export default ChatsScreen;
