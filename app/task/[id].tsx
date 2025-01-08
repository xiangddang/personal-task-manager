import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SPACING, FONT_SIZES, RADIUS } from "../../styles/constants";
import { saveToStorage } from "../../utils/storage";
import { TaskStatus } from "../../types/TaskStatus";
import { Theme } from "../../styles/theme";
import { Task } from "../../types/Task";
import Toast from "react-native-toast-message";
import { taskEventEmitter } from "../../utils/taskEventEmitter";
import { fetchTaskById } from "../../utils/taskUtils";
import ActionButton from "../../components/ActionButton";

const TaskDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  // Task state
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const STORAGE_KEY = "@tasks-list";

  const dynamicStyles = styles(theme);

  // load task by id
  useEffect(() => {
    const loadTask = async () => {
      const { tasks: fetchedTasks, foundTask } = await fetchTaskById(
        id as string,
        STORAGE_KEY
      );
      setTasks(fetchedTasks);
      setCurrentTask(foundTask);
      if (foundTask) {
        setEditedTitle(foundTask.title);
        setEditedDescription(foundTask.description);
      }
    };
    loadTask();
  }, [id]);

  // common function to update task
  const updateTask = async (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask?.id ? updatedTask : task
    );
    // update state
    setCurrentTask(updatedTask);
    setTasks(updatedTasks);
    await saveToStorage(STORAGE_KEY, updatedTasks);
    // emit event to update task list
    taskEventEmitter.emit("taskUpdated");
  };

  // toggle task status
  const toggleStatus = async () => {
    if (!currentTask) return;

    const updatedTask = {
      ...currentTask,
      status:
        currentTask.status === TaskStatus.Completed
          ? TaskStatus.Pending
          : TaskStatus.Completed,
    };

    await updateTask(updatedTask);
    Toast.show({
      type: "success",
      text1: "Task status updated",
    });
  };

  // save edited task
  const saveEdits = async () => {
    if (!currentTask) return;

    const updatedTask = {
      ...currentTask,
      title: editedTitle,
      description: editedDescription,
    };

    await updateTask(updatedTask);
    Toast.show({
      type: "success",
      text1: "Task updated successfully",
    });
    setIsEditing(false);
  };

  // if task not found, error screen is shown
  if (!currentTask) {
    return (
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.modalTitle}>Task Not Found</Text>
        <ActionButton
          content="Go Back"
          onPress={() => router.back()}
          backgroundColor={theme.border}
        />
      </View>
    );
  }

  // render editing fields
  const renderEditingFields = () => (
    <>
      <Text style={dynamicStyles.label}>Title</Text>
      <TextInput
        style={dynamicStyles.input}
        value={editedTitle}
        onChangeText={setEditedTitle}
        placeholder="Enter Title"
        placeholderTextColor={theme.placeholder}
      />
      <Text style={dynamicStyles.label}>Description</Text>
      <TextInput
        style={dynamicStyles.input}
        value={editedDescription}
        onChangeText={setEditedDescription}
        placeholder="Enter Description"
        placeholderTextColor={theme.placeholder}
        multiline
      />
    </>
  );

  // render task details
  const renderTaskDetails = () => (
    <>
      <Text style={dynamicStyles.modalTitle}>{currentTask?.title}</Text>
      <Text style={dynamicStyles.modalDescription}>
        {currentTask?.description}
      </Text>
      <Text style={dynamicStyles.modalStatus}>
        Status:{" "}
        <Text
          style={{
            color:
              currentTask?.status === TaskStatus.Pending
                ? theme.pending
                : theme.completed,
            fontWeight: "bold",
          }}
        >
          {currentTask?.status}
        </Text>
      </Text>
    </>
  );

  // render action buttons based on editing state
  const renderActionButtons = () => {
    if (isEditing) {
      return (
        <>
          <ActionButton
            content="Save"
            onPress={saveEdits}
            backgroundColor={theme.completed}
          />
          <ActionButton
            content="Cancel"
            onPress={() => setIsEditing(false)}
            backgroundColor={theme.border}
          />
        </>
      );
    }

    return (
      <>
        <ActionButton
          content={
            currentTask.status === TaskStatus.Pending
              ? "Mark as Completed"
              : "Revert to Pending"
          }
          onPress={toggleStatus}
          backgroundColor={theme.completed}
        />
        <ActionButton
          content="Edit"
          onPress={() => setIsEditing(true)}
          backgroundColor={theme.pending}
        />
        <ActionButton
          content="Back"
          onPress={() => router.back()}
          backgroundColor={theme.border}
        />
      </>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.card}>
        {isEditing ? renderEditingFields() : renderTaskDetails()}
      </View>

      <View style={dynamicStyles.actionColumn}>{renderActionButtons()}</View>
      <Toast />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: SPACING.large,
      backgroundColor: theme.background,
    },
    card: {
      width: "90%",
      backgroundColor: theme.cardBackground,
      padding: SPACING.large,
      borderRadius: RADIUS.large,
      shadowColor: theme.text,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      marginBottom: SPACING.large,
    },
    modalTitle: {
      fontSize: FONT_SIZES.title,
      fontWeight: "bold",
      marginBottom: SPACING.small,
      color: theme.text,
    },
    modalDescription: {
      fontSize: FONT_SIZES.description,
      marginBottom: SPACING.small,
      color: theme.text,
    },
    modalStatus: {
      fontSize: FONT_SIZES.status,
      marginTop: SPACING.small,
      fontStyle: "italic",
      color: theme.text,
    },
    actionColumn: {
      flexDirection: "column",
      alignItems: "center",
      width: "80%",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: RADIUS.medium,
      padding: SPACING.small,
      marginBottom: SPACING.medium,
      color: theme.text,
      backgroundColor: theme.cardBackground,
    },
    label: {
      fontSize: FONT_SIZES.label,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: SPACING.micro,
    },
  });

export default TaskDetails;
