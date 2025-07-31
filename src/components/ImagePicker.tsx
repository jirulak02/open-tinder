import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/styles";

export const ImagePicker = ({
  text,
  onChange,
}: {
  text: string;
  onChange: (value: ImagePickerAsset[]) => void;
}) => {
  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 4,
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
});
