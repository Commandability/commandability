import { StyleSheet } from "react-native";

export default (colors) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: colors.overlay,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      opacity: 0.2,
    },
    container: {
      flex: 1,
    },
    content: {
      borderBottomWidth: 1,
      borderBottomColor: colors.deemphasized,
      marginHorizontal: 8,
      paddingVertical: 4,
    },
    line: {
      flex: 1,
      flexDirection: "row",
    },
    name: {
      flex: 1,
      textAlign: "left",
      fontFamily: "ClearSans-Regular",
      color: colors.text.main,
    },
    label: {
      textAlign: "left",
      fontFamily: "ClearSans-Regular",
      fontSize: 14,
      color: colors.text.disabled,
    },
  });
