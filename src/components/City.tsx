import { Text, TouchableOpacity } from "react-native";

import { Icon } from "./Icon";
import { DARK_GRAY, styles } from "@/styles";

export const City = () => (
  <TouchableOpacity style={styles.city}>
    <Text style={styles.cityText}>
      <Icon name="location-sharp" size={13} color={DARK_GRAY} /> New York
    </Text>
  </TouchableOpacity>
);
