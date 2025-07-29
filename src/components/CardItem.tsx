import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/styles";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  age: number;
  description: string;
  image: string;
  hasVariant?: boolean;
};

export const CardItem = ({ age, description, hasVariant, image, name }: Props) => {
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
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={{ uri: image }} style={imageStyle} />

      {/* MATCHES */}
      {age && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Ionicons name="heart" color={COLORS.white} size={13} /> {age}
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      {/* DESCRIPTION */}
      {description && <Text style={styles.descriptionCardItem}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: COLORS.pink,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    color: COLORS.white,
  },
  descriptionCardItem: {
    color: COLORS.gray,
    textAlign: "center",
  },
});
