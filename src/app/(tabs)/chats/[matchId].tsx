import { useMutation, useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { MessageBubble } from "@/features/chats/components/MessageBubble";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const { matchId } = useLocalSearchParams<{ matchId: Id<"matches"> }>();

  const messages = useQuery(api.messages.getMessages, { matchId });
  const currentUser = useQuery(api.auth.loggedInUser);
  const sendMessage = useMutation(api.messages.sendMessage);

  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const handleSendMessage = async () => {
    const messageToSend = newMessage.trim();

    if (!messageToSend) return;

    try {
      await sendMessage({
        matchId,
        content: messageToSend,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      Alert.alert("Error", "Failed to send message. Please try again.");
    }
  };

  if (!messages || !currentUser) {
    return <LoadingIndicator />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble message={item} isCurrentUser={item.senderId === currentUser._id} />
        )}
        keyExtractor={(item) => item._id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.gray}
          multiline
          maxLength={1000}
          onSubmitEditing={handleSendMessage}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            newMessage.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
          ]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Ionicons name="send" size={20} color={newMessage.trim() ? COLORS.white : COLORS.gray} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: COLORS.pink,
  },
  sendButtonInactive: {
    backgroundColor: "#E5E5E5",
  },
});

export default ChatScreen;
