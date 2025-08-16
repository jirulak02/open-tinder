import { StyleSheet, View } from "react-native";

import { Text } from "./Text";

type Props = {
  text: string;
};

export const NoResults = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
