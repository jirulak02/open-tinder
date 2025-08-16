import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  hasPreviousSwipe: boolean;
  handleRewind: () => Promise<void>;
};

export const EmptyStack = ({ hasPreviousSwipe, handleRewind }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>There are no more profiles for you at the moment.</Text>
      {hasPreviousSwipe && (
        <TouchableOpacity onPress={handleRewind} style={styles.rewindButton}>
          <FontAwesome6 name="arrow-rotate-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  rewindButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: COLORS.black,
    borderRadius: 100,
    padding: 12,
    opacity: 0.7,
  },
});
