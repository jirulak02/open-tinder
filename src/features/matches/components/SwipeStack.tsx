import { useMutation } from "convex/react";
import { useState } from "react";
import { Alert } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

import { CardItem } from "@/components/CardItem";
import { api } from "@convex/_generated/api";
import { Doc, Id } from "@convex/_generated/dataModel";

type Props = {
  potentialMatches: Doc<"profiles">[];
};

export const SwipeStack = ({ potentialMatches }: Props) => {
  const swipeUser = useMutation(api.swipes.swipeUser);

  const [swiper, setSwiper] = useState<CardStack | null>(null);

  void swiper;

  const handleSwipe = async ({ userId, isLike }: { userId: Id<"users">; isLike: boolean }) => {
    const result = await swipeUser({
      swipedUserId: userId,
      isLike,
    });

    if (result.isMatch) {
      Alert.alert("It's a match!");
    }
  };

  return (
    <CardStack
      loop={false}
      verticalSwipe={false}
      renderNoMoreCards={() => null}
      ref={(newSwiper) => setSwiper(newSwiper)}
    >
      {potentialMatches.map((profile) => (
        <Card
          key={profile._id}
          onSwipedLeft={async () => await handleSwipe({ userId: profile.userId, isLike: false })}
          onSwipedRight={async () => await handleSwipe({ userId: profile.userId, isLike: true })}
        >
          <CardItem
            hasActions
            name={profile.name}
            age={profile.age}
            description={profile.description}
            image={profile.imageUrl}
          />
        </Card>
      ))}
    </CardStack>
  );
};
