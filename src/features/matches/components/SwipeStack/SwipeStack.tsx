import { useMutation } from "convex/react";
import { useState } from "react";
import { Alert } from "react-native";
import { type SwipeDirection, SwipeableCardStack } from "react-native-swipeable-card-stack";

import { EmptyStack } from "./EmptyStack";
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
    (profile): profile is Profile | PreviousSwipeData["profile"] => Boolean(profile)
  );

  const handleSwipeEnded = async (profile: Profile, direction: SwipeDirection) => {
    const swipeResult = await swipeUser({
      swipedUserId: profile.userId,
      isLike: direction === "right",
    });

    setPreviousSwipeData({
      profile: {
        ...profile,
        // Add tempId to avoid duplicate keys in the stack if someone revokes the latest match
        tempId: `temp_${profile._id}`,
      },
      direction,
      swipeId: swipeResult.swipeId,
      matchId: swipeResult.matchId,
    });
    // Set only the last swipe direction, because we removed one profile from potentialMatches by the swipe
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

  if (potentialMatches.length === 0) {
    return <EmptyStack hasPreviousSwipe={swipes.length > 0} handleRewind={handleRewind} />;
  }

  return (
    <SwipeableCardStack
      data={stackProfiles}
      swipes={swipes}
      keyExtractor={(item) => ("tempId" in item ? item.tempId : item._id)}
      onSwipeEnded={handleSwipeEnded}
      renderCard={(profile) => (
        <SwipeCard
          profile={profile}
          hasPreviousSwipe={swipes.length > 0}
          handleRewind={handleRewind}
        />
      )}
    />
  );
};
