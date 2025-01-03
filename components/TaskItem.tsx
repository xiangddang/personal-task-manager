import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { lightTheme, darkTheme } from "../styles/theme";
import { Task } from "../types/Task";
import { SPACING } from "../styles/constants";

interface TaskItemProps {
  task: Task;
  theme: typeof lightTheme | typeof darkTheme;
  onDelete: (id: number) => void;
  onPress: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  theme,
  onDelete,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.taskItem,
        { backgroundColor: theme.cardBackground, shadowColor: theme.text },
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.detailsContainer}>
        <Text style={[styles.taskTitle, { color: theme.text }]}>
          {task.title}
        </Text>
        <Text style={[styles.taskDescription, { color: theme.text }]}>
          {task.description}
        </Text>
        <Text
          style={[
            styles.taskStatus,
            {
              color:
                task.status === "Completed" ? theme.completed : theme.pending,
            },
          ]}
        >
          {task.status}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => {
          onDelete(task.id);
        }}
      >
        <Icon name="delete" type="material" size={32} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
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
    position: "relative",
  },
  detailsContainer: {
    flex: 1,
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
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.large,
  },
});

export default TaskItem;
