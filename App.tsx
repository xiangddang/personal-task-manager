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
import { COLORS, FONT_SIZES, SPACING } from "./styles/constants";
import { lightTheme, darkTheme } from "./styles/theme";
import TaskList from "./components/TaskList";
import Toast from "react-native-toast-message";

const { height: screenHeight } = Dimensions.get("window");

const dynamicPaddingTop = screenHeight * 0.08;

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.cardBackground }]}
    >
      <Text style={[styles.header, { color: theme.text }]}>Task List</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#007AFF" : "#f4f3f4"}
        style={styles.toggleButton}
      />
      <TaskList theme={theme}/>
      <Toast/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: dynamicPaddingTop,
  },
  header: {
    fontSize: FONT_SIZES.header,
    fontWeight: "bold",
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
  },
  toggleButton: {
    position: "absolute",
    top: dynamicPaddingTop + SPACING.medium,
    right: 30,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.medium,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: FONT_SIZES.button,
  },
});
