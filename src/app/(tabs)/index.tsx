import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Alert, ImageBackground, View } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

import IMAGE_BG from "@/assets/images/bg.png";
import { CardItem } from "@/components/CardItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { styles } from "@/styles";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";

const HomeScreen = () => {
  const potentialMatches = useQuery(api.profiles.getPotentialMatches);
  const swipeUser = useMutation(api.swipes.swipeUser);

  const [swiper, setSwiper] = useState<CardStack | null>(null);

  void swiper;

  const handleSwipe = async ({
    profile,
    isLike,
  }: {
    profile: Doc<"profiles">;
    isLike: boolean;
  }) => {
    const result = await swipeUser({
      swipedUserId: profile.userId,
      isLike,
    });

    if (result.isMatch) {
      Alert.alert("It's a match!");
    }
  };

  if (!potentialMatches) {
    return <LoadingIndicator />;
  }

  return (
    <ImageBackground source={IMAGE_BG} style={styles.bg}>
      <View style={styles.containerHome}>
        <CardStack
          loop={false}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper) => setSwiper(newSwiper)}
        >
          {potentialMatches.map((profile) => (
            <Card
              key={profile._id}
              onSwipedLeft={async () => await handleSwipe({ profile, isLike: false })}
              onSwipedRight={async () => await handleSwipe({ profile, isLike: true })}
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
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
