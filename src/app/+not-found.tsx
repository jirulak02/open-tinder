import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { Text } from "@/components/Text";
import { COLORS } from "@/styles";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View
        style={[
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
              color: COLORS.blue,
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
