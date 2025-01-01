import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "../styles/theme";
import { Task } from "../types/Task";
import { SPACING } from "../styles/constants";

interface TaskItemProps {
  task: Task;
  theme: typeof lightTheme | typeof darkTheme;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, theme }) => {
  return (
    <View style={[styles.taskItem, { backgroundColor: theme.cardBackground, shadowColor: theme.text }]}>
      <Text style={[styles.taskTitle, { color: theme.text }]}>{task.title}</Text>
      <Text style={[styles.taskDescription, { color: theme.text }]}>{task.description}</Text>
      <Text
        style={[
          styles.taskStatus,
          {
            color:
              task.status === "Completed"
                ? theme.completed
                : theme.pending,
          },
        ]}
      >
        {task.status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: SPACING.small,
    marginBottom: SPACING.small,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    elevation: 4,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 14,
    textAlign: "right",
  },
});

export default TaskItem;
