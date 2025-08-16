import { LinearGradient } from "expo-linear-gradient";
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
    <>
      <LinearGradient
        colors={[`${COLORS.black}50`, `${COLORS.black}00`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />
      <View style={[styles.container, style]}>
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <TouchableOpacity key={index} onPress={() => onPress?.(index)} style={{ flex: 1 }}>
              <View
                style={[
                  styles.segment,
                  {
                    backgroundColor: isActive ? COLORS.white : `${COLORS.white}50`,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1,
  },
  container: {
    width: "100%",
    position: "absolute",
    top: 12,
    zIndex: 2,
    paddingHorizontal: 20,
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
