import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { HorizontalScrollIndicator } from "@/components/HorizontalScrollIndicator";
import { Text } from "@/components/Text";
import { COLORS, DIMENSIONS } from "@/styles";
import type { Profile } from "@convex/profiles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  profile: Profile;
  hasPreviousSwipe: boolean;
  handleRewind: () => Promise<void>;
};

export const SwipeCard = ({ profile, hasPreviousSwipe, handleRewind }: Props) => {
  const { name, age, description, images } = profile;

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const goToIndex = (index: number) => {
    if (index < 0 || index >= images.length) return;

    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleImageChange = (e: GestureResponderEvent) => {
    if (e.nativeEvent.locationX < DIMENSIONS.width / 2) {
      goToIndex(currentIndex - 1);
    } else {
      goToIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(uri) => uri}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: DIMENSIONS.width,
          offset: DIMENSIONS.width * index,
          index,
        })}
        renderItem={({ item: image }) => (
          <Pressable onPress={handleImageChange}>
            <Image source={{ uri: image }} style={styles.image} />
          </Pressable>
        )}
      />
      <HorizontalScrollIndicator
        total={images.length}
        currentIndex={currentIndex}
        onPress={goToIndex}
      />
      {hasPreviousSwipe && (
        <TouchableOpacity onPress={handleRewind} style={styles.rewindButton}>
          <FontAwesome6 name="arrow-rotate-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
      <LinearGradient
        colors={[`${COLORS.black}80`, `${COLORS.black}80`, `${COLORS.black}00`]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />
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
    width: DIMENSIONS.width,
    height: Platform.OS === "web" ? DIMENSIONS.height - 113 : "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
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
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 32,
    gap: 16,
  },
  name: {
    color: COLORS.white,
    fontSize: 30,
  },
  description: {
    color: COLORS.white,
  },
});
