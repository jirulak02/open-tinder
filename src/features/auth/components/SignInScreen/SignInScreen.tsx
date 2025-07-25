import { ImageBackground, StyleSheet, View } from "react-native";

import { SignInForm } from "./SignInForm";
import IMAGE_BG from "@/assets/images/bg.png";

export const SignInScreen = () => {
  return (
    <ImageBackground source={IMAGE_BG} style={styles.bg}>
      <View style={styles.container}>
        <SignInForm />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
