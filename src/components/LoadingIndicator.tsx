import { ActivityIndicator, View } from "react-native";

export const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  );
};
