import { useMutation } from "convex/react";
import { useState } from "react";
import { Alert } from "react-native";
import { type SwipeDirection, SwipeableCardStack } from "react-native-swipeable-card-stack";

import { SwipeCard } from "./SwipeCard";
import type { PreviousSwipeData } from "@/features/matches/types";
import { api } from "@convex/_generated/api";
import type { Profile } from "@convex/profiles";

type Props = {
  potentialMatches: Profile[];
};

export const SwipeStack = ({ potentialMatches }: Props) => {
  const swipeUser = useMutation(api.swipes.swipeUser);
  const rewindSwipe = useMutation(api.swipes.rewindSwipe);

  const [swipes, setSwipes] = useState<SwipeDirection[]>([]);
  const [previousSwipeData, setPreviousSwipeData] = useState<PreviousSwipeData | null>(null);

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
    <SwipeableCardStack
      data={stackProfiles}
      swipes={swipes}
      keyExtractor={(item) => item._id}
      onSwipeEnded={handleSwipeEnded}
      renderCard={(profile) => (
        <SwipeCard
          profile={profile}
          previousSwipeData={swipes.length > 0 ? previousSwipeData : null}
          handleRewind={handleRewind}
        />
      )}
    />
  );
};
