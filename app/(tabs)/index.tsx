import DEMO from "@/assets/data/demo";
import styles from "@/assets/styles";
import { CardItem, City, Filters } from "@/components";
import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";

export default function HomeScreen() {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  void swiper;

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.bg}
    >
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
          {DEMO.map((item) => (
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
}
