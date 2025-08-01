import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "@/components/Text";
import type { PreviousSwipeData } from "@/features/matches/types";
import { COLORS } from "@/styles";
import type { Profile } from "@convex/profiles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  profile: Profile;
  previousSwipeData: PreviousSwipeData | null;
  handleRewind: () => Promise<void>;
};

export const SwipeCard = ({ profile, previousSwipeData, handleRewind }: Props) => {
  const { name, age, description, images } = profile;

  const [currentImage, setCurrentImage] = useState(images[0]);

  void setCurrentImage;

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentImage }} style={styles.image} />
      <TouchableOpacity
        onPress={handleRewind}
        disabled={!previousSwipeData}
        style={[styles.rewindButton, !previousSwipeData && styles.disabledRewindButton]}
      >
        <FontAwesome6 name="arrow-rotate-left" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {name} - {age}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    flex: 1,
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
  disabledRewindButton: {
    opacity: 0.5,
    backgroundColor: COLORS.gray,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
    gap: 16,
    backgroundColor: COLORS.black,
    opacity: 0.7,
  },
  name: {
    color: COLORS.white,
    fontSize: 30,
  },
  description: {
    color: COLORS.white,
  },
});
