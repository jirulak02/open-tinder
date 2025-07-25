import { useQuery } from "convex/react";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

import IMAGE_BG from "@/assets/images/bg.png";
import { CardItem } from "@/components/CardItem";
import { styles } from "@/styles";
import { api } from "@convex/_generated/api";

const HomeScreen = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  const profiles = useQuery(api.profiles.getAllProfiles);

  void swiper;

  if (!profiles) {
    return (
      <ImageBackground source={IMAGE_BG} style={styles.bg}>
        <View style={[styles.containerHome, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={IMAGE_BG} style={styles.bg}>
      <View style={styles.containerHome}>
        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper) => setSwiper(newSwiper)}
        >
          {profiles.map((item) => (
            <Card key={item._id}>
              <CardItem
                hasActions
                name={item.name}
                age={item.age}
                description={item.description}
                image={item.imageUrl}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
