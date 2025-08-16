import { StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { ChatsList } from "@/features/chats/components/ChatsList";
import { COLORS } from "@/styles";

const ChatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <ChatsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: COLORS.gray,
  },
});

export default ChatsScreen;
