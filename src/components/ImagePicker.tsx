import { ImagePickerAsset, launchImageLibraryAsync } from "expo-image-picker";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { COLORS } from "@/styles";

export const ImagePicker = ({
  children,
  onChange,
}: {
  children: ReactNode;
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
    <TouchableOpacity onPress={pickImage} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.lightGray,
  },
});
