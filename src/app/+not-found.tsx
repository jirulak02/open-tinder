import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

import { globalStyles } from "@/styles";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View
        style={[
          globalStyles.bg,
          {
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            lineHeight: 32,
          }}
        >
          This screen does not exist.
        </Text>
        <Link
          href="/"
          style={{
            marginTop: 15,
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              lineHeight: 30,
              fontSize: 16,
              color: "#0a7ea4",
            }}
          >
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
};

export default NotFoundScreen;
