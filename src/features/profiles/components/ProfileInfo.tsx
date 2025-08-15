import { StyleSheet, View } from "react-native";

import { GradientIcon } from "@/components/GradientIcon";
import { Text } from "@/components/Text";
import { COLORS } from "@/styles";
import { Profile } from "@convex/profiles";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type Props = {
  profile: Profile;
};

export const ProfileInfo = ({ profile }: Props) => (
  <View>
    <View style={styles.info}>
      <View style={styles.iconText}>
        <GradientIcon icon={Ionicons} name="person" size={15} style={styles.icon} />
        <Text style={{ fontWeight: "bold" }}>Name:</Text>
      </View>
      <Text style={styles.infoContent}>{profile.name}</Text>
    </View>
    <View style={styles.info}>
      <View style={styles.iconText}>
        <GradientIcon icon={Ionicons} name="calendar" size={15} style={styles.icon} />
        <Text style={{ fontWeight: "bold" }}>Age:</Text>
      </View>
      <Text style={styles.infoContent}>{profile.age} years old</Text>
    </View>
    <View style={styles.info}>
      <View style={styles.iconText}>
        <GradientIcon icon={FontAwesome} name="quote-left" size={15} style={styles.icon} />
        <Text style={{ fontWeight: "bold" }}>Info:</Text>
      </View>
      <Text style={styles.infoContent}>{profile.description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    gap: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  icon: {
    paddingHorizontal: 10,
  },
  infoContent: {
    color: COLORS.gray,
    fontSize: 13,
    flexShrink: 1,
  },
});
