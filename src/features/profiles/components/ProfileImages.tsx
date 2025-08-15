import { useRef, useState } from "react";
import { FlatList, GestureResponderEvent, Image, Pressable, StyleSheet, View } from "react-native";

import { HorizontalScrollIndicator } from "@/components/HorizontalScrollIndicator";
import { DIMENSIONS } from "@/styles";
import type { Profile } from "@convex/profiles";

type Props = {
  profile: Profile;
};

export const ProfileImages = ({ profile }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const goToIndex = (index: number) => {
    if (index < 0 || !profile || index >= profile.images.length) return;

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
        data={profile.images}
        keyExtractor={(uri) => uri}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: DIMENSIONS.width,
          offset: DIMENSIONS.width * index,
          index,
        })}
        onMomentumScrollEnd={(e) =>
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / DIMENSIONS.width))
        }
        renderItem={({ item: image }) => (
          <Pressable onPress={handleImageChange}>
            <Image source={{ uri: image }} style={styles.image} />
          </Pressable>
        )}
      />
      <HorizontalScrollIndicator
        total={profile.images.length}
        currentIndex={currentIndex}
        onPress={goToIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: DIMENSIONS.width,
    height: 500,
  },
});
