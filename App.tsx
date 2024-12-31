import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";
import { mockTasks } from "./data/mockTasks";
import { COLORS, FONT_SIZES, SPACING } from "./styles/constants";
import { TaskStatus } from "./types/TaskStatus";
import { lightTheme, darkTheme } from "./styles/theme";

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
      <FlatList
        data={mockTasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={[styles.taskItem, { backgroundColor: theme.cardBackground }]}
          >
            <Text style={[styles.taskTitle, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.taskDescription, { color: theme.text }]}>
              {item.description}
            </Text>
            <Text
              style={[
                styles.taskStatus,
                {
                  color:
                    item.status === TaskStatus.Completed
                      ? theme.completed
                      : theme.pending,
                },
              ]}
            >
              {item.status === TaskStatus.Completed ? "Completed" : "Pending"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyList, { color: theme.text }]}>
            No tasks available
          </Text>
        }
      />
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
    marginBottom: SPACING.large,
  },
  toggleButton: {
    position: "absolute",
    top: dynamicPaddingTop - 10,
    right: 30,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: FONT_SIZES.button,
  },
  taskItem: {
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
    marginBottom: SPACING.small,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  taskTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    color: "#333",
    marginBottom: SPACING.small,
  },
  taskDescription: {
    fontSize: FONT_SIZES.description,
    fontWeight: "bold",
    textAlign: "right",
    color: COLORS.description,
    marginBottom: SPACING.small,
  },
  taskStatus: {
    fontSize: FONT_SIZES.status,
    fontWeight: "bold",
    textAlign: "right",
  },
  completed: {
    color: COLORS.completed,
  },
  pending: {
    color: COLORS.pending,
  },
  emptyList: {
    fontSize: FONT_SIZES.emptyList,
    color: "#888",
    textAlign: "center",
    marginTop: SPACING.large,
  },
});
