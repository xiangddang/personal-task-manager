import React from "react";
import { View, StyleSheet, Switch, Text, Dimensions } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { darkTheme, Theme } from "../styles/theme";
import Draggable from "../components/Draggable";
import { FONT_SIZES, RADIUS, SPACING } from "../styles/constants";

export default function FloatingSwitch() {
  const { theme, toggleTheme } = useTheme();

  // get screen dimensions, default to 360x640
  const { width: screenWidth = 360, height: screenHeight = 640 } =
    Dimensions.get("window");

  const defaultXPosition = screenWidth * 0.8;
  const defaultYPosition = screenHeight * 0.1;
  const dynamicStyles = styles(theme);
  return (
    <Draggable initialX={defaultXPosition} initialY={defaultYPosition}>
      <View style={dynamicStyles.container}>
        <Switch
          value={theme === darkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === darkTheme ? "#007AFF" : "#f4f3f4"}
        />
        <Text style={dynamicStyles.label}>
          {theme === darkTheme ? "Dark" : "Light"}
        </Text>
      </View>
    </Draggable>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.cardBackground,
      borderRadius: RADIUS.modeButton,
      padding: SPACING.small,
      alignItems: "center",
      elevation: 5, // for Android
      shadowColor: "#000", // for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    label: {
      marginTop: SPACING.micro,
      fontSize: FONT_SIZES.small,
      color: theme.text,
      fontWeight: "600",
    },
  });
