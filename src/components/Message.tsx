import { Image, Text, View } from "react-native";

import { styles } from "@/styles";

type Props = {
  image: any;
  lastMessage: string;
  name: string;
};

export const Message = ({ image, lastMessage, name }: Props) => (
  <View style={styles.containerMessage}>
    <Image source={image} style={styles.avatar} />
    <View>
      <Text>{name}</Text>
      <Text style={styles.message}>{lastMessage}</Text>
    </View>
  </View>
);
