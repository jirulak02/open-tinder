import { Text, View } from "react-native";

import { Icon } from "../../../components/Icon";
import { COLOR_WHITE, globalStyles } from "@/styles";

type Props = {
  name: string;
  age: number;
  description: string;
};

export const ProfileItem = ({ name, age, description }: Props) => (
  <View style={globalStyles.containerProfileItem}>
    <View style={globalStyles.matchesProfileItem}>
      <Text style={globalStyles.matchesTextProfileItem}>
        <Icon name="heart" size={13} color={COLOR_WHITE} /> {age}
      </Text>
    </View>
    <Text style={globalStyles.name}>
      {name} - {age}
    </Text>
    <Text style={globalStyles.descriptionProfileItem}>{description}</Text>
  </View>
);
