import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Theme } from "../styles/theme";
import TaskList from "../components/TaskList";
import Toast from "react-native-toast-message";
import FloatingSwitch from "../components/FloatingSwitch";

export default function Home() {
  const { theme } = useTheme();

  const dynamicStyles = styles(theme);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <FloatingSwitch />
      <View style={dynamicStyles.taskListContainer}>
        <TaskList theme={theme} />
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    taskListContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  });
