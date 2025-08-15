import { StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import { Doc } from "@convex/_generated/dataModel";

type Props = {
  message: Doc<"messages">;
};

export const ReceivedMessageBubble = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: COLORS.subtleGray,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.black,
  },
});
