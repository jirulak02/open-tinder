import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { IconT } from "../types";

const Icon = ({ color, name, size, style }: IconT) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);

export default Icon;
