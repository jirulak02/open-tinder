import { StyleSheet, View } from "react-native";

import { SignInForm } from "./SignInForm";
import { globalStyles } from "@/styles";

export const SignIn = () => {
  return (
    <View style={globalStyles.bg}>
      <View style={styles.container}>
        <SignInForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
