import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { FONT_SIZES, RADIUS, SPACING } from "../styles/constants";
import { Theme } from "../styles/theme";
import { useTheme } from "../context/ThemeContext";

// Action Button used in the TaskDetails and AddTaskModal components
interface ActionButtonProps {
  content: string;
  onPress: () => void;
  backgroundColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  content,
  onPress,
  backgroundColor,
}) => {
  const { theme } = useTheme();
  const dynamicStyles = styles(theme);

  return (
    <TouchableOpacity
      style={[
        dynamicStyles.actionButton,
        backgroundColor && { backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={dynamicStyles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = (theme: Theme) =>
  StyleSheet.create({
    actionButton: {
      width: "100%",
      paddingVertical: SPACING.medium,
      borderRadius: RADIUS.medium,
      alignItems: "center",
      marginBottom: SPACING.small,
    },
    buttonText: {
      color: theme.text,
      fontSize: FONT_SIZES.button,
      fontWeight: "bold",
    },
  });
