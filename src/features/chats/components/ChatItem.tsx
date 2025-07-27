import { Image, Text, View } from "react-native";

import { styles } from "@/styles";

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
