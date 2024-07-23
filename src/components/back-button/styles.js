import { StyleSheet } from "react-native";

export default (colors) =>
  StyleSheet.create({
    backOpacity: {
      position: "absolute",
      left: 8,
      top: 32,
      zIndex: 1,
    },
    backIcon: {
      color: colors.primary,
      fontSize: 48,
    },
  });
