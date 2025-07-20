import type { IconT } from "@/types";
import { Ionicons } from "@expo/vector-icons";

export const Icon = ({ color, name, size, style }: IconT) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);
