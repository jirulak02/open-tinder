import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { ChatHeader } from "@/features/chats/components/ChatHeader";
import { MessageInput } from "@/features/chats/components/MessageInput";
import { MessagesList } from "@/features/chats/components/MessagesList";
import { COLORS } from "@/styles";
import { Id } from "@convex/_generated/dataModel";

const ChatScreen = () => {
  const { matchId } = useLocalSearchParams<{ matchId: Id<"matches"> }>();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ChatHeader matchId={matchId} />
      <MessagesList matchId={matchId} />
      <MessageInput matchId={matchId} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
});

export default ChatScreen;
