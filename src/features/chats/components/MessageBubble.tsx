import { StyleSheet, Text, View } from "react-native";

import { Doc } from "@convex/_generated/dataModel";

type Props = {
  message: Doc<"messages">;
  isCurrentUser: boolean;
};

export const MessageBubble = ({ message, isCurrentUser }: Props) => {
  const formatTime = (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View
      style={[
        styles.messageContainer,
        isCurrentUser ? styles.sentContainer : styles.receivedContainer,
      ]}
    >
      <View
        style={[styles.messageBubble, isCurrentUser ? styles.sentBubble : styles.receivedBubble]}
      >
        <Text style={[styles.messageText, isCurrentUser ? styles.sentText : styles.receivedText]}>
          {message.content}
        </Text>
        <Text
          style={[styles.timeText, isCurrentUser ? styles.sentTimeText : styles.receivedTimeText]}
        >
          {formatTime(message.sentAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    marginHorizontal: 10,
  },
  sentContainer: {
    alignItems: "flex-end",
  },
  receivedContainer: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  sentBubble: {
    backgroundColor: "#7444C0",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#F0F0F0",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentText: {
    color: "#FFFFFF",
  },
  receivedText: {
    color: "#000000",
  },
  timeText: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  sentTimeText: {
    color: "#FFFFFF",
    textAlign: "right",
  },
  receivedTimeText: {
    color: "#757E90",
    textAlign: "left",
  },
});
