import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

import { CardItem } from "@/components/CardItem";
import { City } from "@/components/City";
import { Filters } from "@/components/Filters";
import { DEMO_DATA } from "@/lib/data/demo";
import { styles } from "@/styles";

const HomeScreen = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  void swiper;

  return (
    <ImageBackground source={require("@/assets/images/bg.png")} style={styles.bg}>
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>

        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {DEMO_DATA.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
