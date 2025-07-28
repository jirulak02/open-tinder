import { StyleSheet, Text, View } from "react-native";

import { Icon } from "../../../components/Icon";
import { COLORS } from "@/styles";

type Props = {
  name: string;
  age: number;
  description: string;
};

export const ProfileItem = ({ name, age, description }: Props) => (
  <View style={styles.containerProfileItem}>
    <View style={styles.matchesProfileItem}>
      <Text style={styles.matchesTextProfileItem}>
        <Icon name="heart" size={13} color={COLORS.white} /> {age}
      </Text>
    </View>
    <Text style={styles.name}>
      {name} - {age}
    </Text>
    <Text style={styles.descriptionProfileItem}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  containerProfileItem: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 135,
    marginTop: -15,
    backgroundColor: COLORS.pink,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    color: COLORS.white,
    textAlign: "center",
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: COLORS.gray,
    fontSize: 15,
    textAlign: "center",
  },
  descriptionProfileItem: {
    color: COLORS.gray,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
});
