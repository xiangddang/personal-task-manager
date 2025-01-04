import React from "react";
import { Task } from "../types/Task";
import { lightTheme, darkTheme, Theme } from "../styles/theme";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SPACING, COLORS, FONT_SIZES, RADIUS } from "../styles/constants";
import { TaskStatus } from "../types/TaskStatus";
import ModalWrapper from "./ModalWrapper";

interface TaskModalProps {
  visible: boolean;
  task: Task | null;
  isEditing: boolean;
  theme: typeof lightTheme | typeof darkTheme;
  onClose: () => void;
  onSave: () => void;
  onToggleStatus: () => void;
  onEditToggle: () => void;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  task,
  isEditing,
  theme,
  onClose,
  onSave,
  onToggleStatus,
  onEditToggle,
  onChangeTitle,
  onChangeDescription,
}) => {
  if (!task) return null;

  const dynamicStyles = styles(theme);

  return (
    <ModalWrapper visible={visible} theme={theme} onClose={onClose}>
      {/** Edit mode */}
      {isEditing ? (
        <>
          <TextInput
            style={dynamicStyles.input}
            value={task.title}
            onChangeText={onChangeTitle}
            placeholder="Edit Title"
          />
          <TextInput
            style={dynamicStyles.input}
            value={task.description}
            onChangeText={onChangeDescription}
            placeholder="Edit Description"
          />
          <View style={dynamicStyles.buttonRow}>
            <TouchableOpacity
              style={dynamicStyles.actionButton}
              onPress={onSave}
            >
              <Text style={dynamicStyles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.actionButton}
              onPress={onClose}
            >
              <Text style={dynamicStyles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/** View mode */}
          <Text style={dynamicStyles.modalTitle}>{task.title}</Text>
          <Text style={dynamicStyles.modalDescription}>{task.description}</Text>
          <Text style={dynamicStyles.modalStatus}>Status: {task.status}</Text>
          <View style={dynamicStyles.buttonRow}>
            <TouchableOpacity
              style={[
                dynamicStyles.actionButton,
                {
                  backgroundColor:
                    task.status === TaskStatus.Pending
                      ? theme.pending
                      : theme.completed,
                },
              ]}
              onPress={onToggleStatus}
            >
              <Text style={dynamicStyles.actionButtonText}>
                {task.status === "Completed"
                  ? "Mark as Pending"
                  : "Mark as Completed"}
              </Text>
            </TouchableOpacity>
            {task.status === TaskStatus.Pending && (
              <TouchableOpacity
                style={dynamicStyles.actionButton}
                onPress={onEditToggle}
              >
                <Text style={dynamicStyles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ModalWrapper>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: RADIUS.small,
      padding: SPACING.small,
      marginBottom: SPACING.medium,
      color: theme.text,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: SPACING.small,
    },
    actionButton: {
      paddingVertical: SPACING.small,
      paddingHorizontal: SPACING.large,
      backgroundColor: COLORS.pending,
      borderRadius: SPACING.small,
    },
    actionButtonText: {
      color: theme.text,
      fontSize: FONT_SIZES.button,
      fontWeight: "bold",
    },
    modalTitle: {
      fontSize: FONT_SIZES.title,
      fontWeight: "bold",
      marginBottom: SPACING.large,
      color: theme.text,
    },
    modalDescription: {
      fontSize: FONT_SIZES.description,
      marginBottom: SPACING.small,
      color: theme.text,
    },
    modalStatus: {
      fontSize: FONT_SIZES.status,
      marginBottom: SPACING.large,
      color: theme.text,
    },
  });

export default TaskModal;
