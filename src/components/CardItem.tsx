import { Dimensions, Image, Text, View } from "react-native";

import { Icon } from "./Icon";
import { COLOR_WHITE, globalStyles } from "@/styles";

type Props = {
  name: string;
  age: number;
  description: string;
  image: string;
  hasActions?: boolean;
  hasVariant?: boolean;
};

export const CardItem = ({ age, description, hasActions, hasVariant, image, name }: Props) => {
  const fullWidth = Dimensions.get("window").width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];
  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: "#363636",
      fontSize: hasVariant ? 15 : 30,
    },
  ];

  return (
    <View style={globalStyles.containerCardItem}>
      {/* IMAGE */}
      <Image source={{ uri: image }} style={imageStyle} />

      {/* MATCHES */}
      {age && (
        <View style={globalStyles.matchesCardItem}>
          <Text style={globalStyles.matchesTextCardItem}>
            <Icon name="heart" color={COLOR_WHITE} size={13} /> {age}
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && <Text style={globalStyles.descriptionCardItem}>{description}</Text>}
    </View>
  );
};
