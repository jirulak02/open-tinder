import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles, { DARK_GRAY } from "../assets/styles";
import Icon from "./Icon";

const Filters = () => (
  <TouchableOpacity style={styles.filters}>
    <Text style={styles.filtersText}>
      <Icon name="filter" size={13} color={DARK_GRAY} /> Filters
    </Text>
  </TouchableOpacity>
);

export default Filters;
