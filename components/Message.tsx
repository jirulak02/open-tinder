import React from "react";
import { Image, Text, View } from "react-native";
import styles from "../assets/styles";
import { MessageT } from "../types";

const Message = ({ image, lastMessage, name }: MessageT) => (
  <View style={styles.containerMessage}>
    <Image source={image} style={styles.avatar} />
    <View>
      <Text>{name}</Text>
      <Text style={styles.message}>{lastMessage}</Text>
    </View>
  </View>
);

export default Message;
