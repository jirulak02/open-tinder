import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { GradientButton } from "@/components/GradientButton";
import { Text } from "@/components/Text";

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Not Found</Text>
      <Link href="/" asChild style={styles.link}>
        <GradientButton>Go to home screen</GradientButton>
      </Link>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
