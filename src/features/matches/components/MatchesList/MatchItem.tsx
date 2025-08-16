import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Card } from "@/components/Card";
import { GradientIcon } from "@/components/GradientIcon";
import { Text } from "@/components/Text";
import { COLORS, GRADIENT } from "@/styles";
import { Profile } from "@convex/profiles";
import { Entypo, Ionicons } from "@expo/vector-icons";

type Props = {
  profile: Profile;
};

export const MatchItem = ({ profile }: Props) => {
  return (
    <Card style={styles.container}>
      <Link
        href={{
          pathname: "/(tabs)/user/[userId]",
          params: {
            userId: profile.userId,
          },
        }}
        asChild
      >
        <TouchableOpacity>
          <Image source={{ uri: profile.images[0] }} style={styles.image} />
        </TouchableOpacity>
      </Link>
      <Text style={styles.name}>{profile.name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.removeButton]}>
          <GradientIcon icon={Entypo} name="cross" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.chatButton]}>
          <LinearGradient
            colors={GRADIENT.colors}
            start={GRADIENT.start}
            end={GRADIENT.end}
            style={styles.chatButton}
          >
            <Ionicons name="chatbubble" size={24} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.subtleGray,
  },
  name: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.lightGray,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  removeButton: {
    backgroundColor: COLORS.white,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
