import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import { COLORS } from "@/styles";

type Props = {
  total: number;
  currentIndex: number;
  onPress?: (index: number) => void;
  style?: ViewStyle;
};

export const HorizontalScrollIndicator = ({ total, currentIndex, onPress, style }: Props) => {
  if (total <= 1) return null;

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onPress?.(index)}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.segment,
                {
                  backgroundColor: isActive ? COLORS.white : `${COLORS.white}35`,
                },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 12,
    zIndex: 2,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  segment: {
    height: 6,
    borderRadius: 3,
  },
});
