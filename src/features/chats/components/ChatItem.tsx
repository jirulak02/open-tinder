import { Image, Text, View } from "react-native";

import { globalStyles } from "@/styles";

type Props = {
  image: string;
  name: string;
};

export const ChatItem = ({ image, name }: Props) => (
  <View style={globalStyles.containerMessage}>
    <Image source={{ uri: image }} style={globalStyles.avatar} />
    <View>
      <Text>{name}</Text>
    </View>
  </View>
);
