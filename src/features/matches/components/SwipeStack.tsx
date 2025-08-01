import { useMutation } from "convex/react";
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { type SwipeDirection, SwipeableCardStack } from "react-native-swipeable-card-stack";

import { CardItem } from "@/components/CardItem";
import { GradientIcon } from "@/components/GradientIcon";
import { COLORS } from "@/styles";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import type { Profile } from "@convex/profiles";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  potentialMatches: Profile[];
};

export const SwipeStack = ({ potentialMatches }: Props) => {
  const swipeUser = useMutation(api.swipes.swipeUser);
  const rewindSwipe = useMutation(api.swipes.rewindSwipe);

  const [swipes, setSwipes] = useState<SwipeDirection[]>([]);
  const [previousSwipeData, setPreviousSwipeData] = useState<{
    profile: Profile;
    direction: SwipeDirection;
    swipeId: Id<"swipes">;
    matchId?: Id<"matches">;
  } | null>(null);

  const stackProfiles = [previousSwipeData?.profile, ...potentialMatches].filter(
    (profile): profile is Profile => Boolean(profile)
  );

  const handleSwipeEnded = async (profile: Profile, direction: SwipeDirection) => {
    const swipeResult = await swipeUser({
      swipedUserId: profile.userId,
      isLike: direction === "right",
    });

    setPreviousSwipeData({
      profile,
      direction,
      swipeId: swipeResult.swipeId,
      matchId: swipeResult.matchId,
    });
    setSwipes([direction]);

    if (swipeResult.matchId) {
      Alert.alert("It's a match!");
    }
  };

  const handleRewind = async () => {
    if (!previousSwipeData) return;

    await rewindSwipe({
      swipeId: previousSwipeData.swipeId,
      matchId: previousSwipeData.matchId,
    });
    setPreviousSwipeData(null);
    setSwipes([]);
  };

  return (
    <View style={styles.container}>
      <SwipeableCardStack
        data={stackProfiles}
        swipes={swipes}
        keyExtractor={(item) => item._id}
        onSwipeEnded={handleSwipeEnded}
        renderCard={({ name, age, description, images }) => (
          <CardItem name={name} age={age} description={description} images={images} />
        )}
      />
      {swipes.length > 0 && (
        <TouchableOpacity style={styles.rewindButton} onPress={handleRewind}>
          <GradientIcon icon={Ionicons} name="play-back" size={26} style={styles.rewindIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const BUTTON_SIZE = 52;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rewindButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    marginLeft: -BUTTON_SIZE / 2,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  rewindIcon: {
    transform: [{ translateX: 2 }],
  },
});
