import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/components/Icon";
import { ProfileItem } from "@/components/ProfileItem";
import { DEMO_DATA } from "@/lib/data/demo";
import { WHITE, styles } from "@/styles";

const ProfileScreen = () => {
  const { age, image, info1, info2, info3, info4, location, match, name } = DEMO_DATA[7];

  return (
    <ImageBackground source={require("@/assets/images/bg.png")} style={styles.bg}>
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon name="chevron-back" size={20} color={WHITE} style={styles.topIconLeft} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon name="ellipsis-vertical" size={20} color={WHITE} style={styles.topIconRight} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Icon name="ellipsis-horizontal" size={20} color={WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Icon name="chatbubble" size={20} color={WHITE} />
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
