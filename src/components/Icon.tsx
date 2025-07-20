import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export const Icon = ({ color, name, size, style }: Props) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);
