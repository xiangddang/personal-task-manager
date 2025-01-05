import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
  Task,
} from "react-native";
import { FONT_SIZES, SPACING } from "./styles/constants";
import { lightTheme, darkTheme, Theme } from "./styles/theme";
import TaskList from "./components/TaskList";
import Toast from "react-native-toast-message";

const { height: screenHeight } = Dimensions.get("window");
const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth > 600;

const dynamicPaddingTop = screenHeight * 0.08;

export default function App() {
  // change the UI based on the theme chosen by the user
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const dynamicStyles = styles(theme);

  return (
    <SafeAreaView
      style={dynamicStyles.container}
    >
      <Text style={dynamicStyles.header}>Task List</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#007AFF" : "#f4f3f4"}
        style={dynamicStyles.toggleButton}
      />
      <TaskList theme={theme}/>
      <Toast/>
    </SafeAreaView>
  );
}

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: dynamicPaddingTop,
  },
  header: {
    fontSize: FONT_SIZES.header,
    fontWeight: "bold",
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
    color: theme.text,
  },
  toggleButton: {
    position: "absolute",
    top: isTablet? dynamicPaddingTop * 0.5: dynamicPaddingTop,
    right: screenWidth * 0.1,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.medium,
  },
});
