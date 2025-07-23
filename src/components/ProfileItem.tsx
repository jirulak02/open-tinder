import { Text, View } from "react-native";

import { Icon } from "./Icon";
import { WHITE, styles } from "@/styles";

type Props = {
  name: string;
  age: number;
  description: string;
};

export const ProfileItem = ({ name, age, description }: Props) => (
  <View style={styles.containerProfileItem}>
    <View style={styles.matchesProfileItem}>
      <Text style={styles.matchesTextProfileItem}>
        <Icon name="heart" size={13} color={WHITE} /> {age}
      </Text>
    </View>
    <Text style={styles.name}>
      {name} - {age}
    </Text>
    <Text style={styles.descriptionProfileItem}>{description}</Text>
  </View>
);
