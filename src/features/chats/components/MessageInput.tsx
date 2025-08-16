import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { COLORS, GRADIENT } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  matchId: Id<"matches">;
};

export const MessageInput = ({ matchId }: Props) => {
  const sendMessage = useMutation(api.chats.sendMessage);

  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const messageToSend = newMessage.trim();
  const isMessageValid = messageToSend.length > 0 && !isSending;

  const handleSendMessage = async () => {
    if (!isMessageValid) return;

    try {
      setIsSending(true);
      await sendMessage({
        matchId,
        content: messageToSend,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  return (
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
      />
      <TouchableOpacity onPress={handleSendMessage} disabled={!isMessageValid}>
        {isMessageValid ? (
          <LinearGradient
            colors={GRADIENT.colors}
            start={GRADIENT.start}
            end={GRADIENT.end}
            style={styles.sendButton}
          >
            <Ionicons name="send" size={20} color={COLORS.white} />
          </LinearGradient>
        ) : (
          <View style={[styles.sendButton, styles.sendButtonInactive]}>
            <Ionicons name="send" size={20} color={COLORS.gray} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.subtleGray,
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.subtleGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
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
    backgroundColor: COLORS.subtleGray,
  },
});
