/**
 * BackButton Component
 *
 * Handles the back button on screens
 */

import React from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { selectTheme } from "../../redux/selectors";
import themeSelector from "../../utils/themes";
import createStyleSheet from "./styles";

const BackButton = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => selectTheme(state));

  const onCancelPressed = () => {
    const { goBack } = navigation;
    goBack();
  };

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <TouchableOpacity onPress={onCancelPressed} style={styles.backOpacity}>
      <Icon name="chevron-left" style={styles.backIcon} />
    </TouchableOpacity>
  );
};

export default BackButton;
