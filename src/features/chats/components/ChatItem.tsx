import { Image, StyleSheet, View } from "react-native";

import { Text } from "@/components/Text";
import { DIMENSIONS } from "@/styles";

type Props = {
  image: string;
  name: string;
};

export const ChatItem = ({ image, name }: Props) => (
  <View style={styles.containerMessage}>
    <Image source={{ uri: image }} style={styles.avatar} />
    <View>
      <Text>{name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSIONS.width - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
});
