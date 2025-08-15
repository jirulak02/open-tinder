import { useQuery } from "convex/react";
import { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ReceivedMessageBubble } from "./ReceivedMessageBubble";
import { SentMessageBubble } from "./SentMessageBubble";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

type Props = {
  matchId: Id<"matches">;
};

export const MessagesList = ({ matchId }: Props) => {
  const messages = useQuery(api.messages.getMessages, { matchId });
  const currentUser = useQuery(api.auth.loggedInUser);

  const flatListRef = useRef<FlatList>(null);

  if (!messages || !currentUser) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) =>
        item.senderId === currentUser._id ? (
          <SentMessageBubble message={item} />
        ) : (
          <ReceivedMessageBubble message={item} />
        )
      }
      keyExtractor={(item) => item._id}
      style={styles.messagesList}
      contentContainerStyle={styles.messagesContent}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
    />
  );
};

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 10,
  },
});
