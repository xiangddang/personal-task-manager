import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Theme, lightTheme, darkTheme } from "../styles/theme";
import { Task } from "../types/Task";
import { FONT_SIZES, ICON_SIZE, RADIUS, SPACING } from "../styles/constants";

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
  const dynamicStyles = styles(theme);

  return (
    <View
      style={
        dynamicStyles.taskItem}
    >
      <TouchableOpacity onPress={onPress} style={dynamicStyles.detailsContainer}>
        <Text style={dynamicStyles.taskTitle}>
          {task.title}
        </Text>
        <Text style={dynamicStyles.taskDescription}>
          {task.description}
        </Text>
        <Text
          style={[
            dynamicStyles.taskStatus,
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
        style={dynamicStyles.deleteContainer}
        onPress={() => {
          onDelete(task.id);
        }}
      >
        <Icon name="delete" type="material" size={ICON_SIZE.trash} color={theme.trash} />
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    padding: SPACING.small,
    marginBottom: SPACING.small,
    borderRadius: RADIUS.medium,
    shadowColor: theme.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: RADIUS.small,
    elevation: 5,
    position: "relative",
    backgroundColor: theme.cardBackground, 
  },
  detailsContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    marginBottom: SPACING.micro,
    color: theme.text,
  },
  taskDescription: {
    fontSize: FONT_SIZES.description,
    marginBottom: SPACING.micro,
    color: theme.text,
  },
  taskStatus: {
    fontSize: FONT_SIZES.status,
    fontWeight: "bold",
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.large,
  },
});

export default TaskItem;
