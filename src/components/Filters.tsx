import { Text, TouchableOpacity } from "react-native";

import { Icon } from "./Icon";
import { DARK_GRAY, styles } from "@/styles";

export const Filters = () => (
  <TouchableOpacity style={styles.filters}>
    <Text style={styles.filtersText}>
      <Icon name="filter" size={13} color={DARK_GRAY} /> Filters
    </Text>
  </TouchableOpacity>
);
