import React from "react";
import { Task } from "../types/Task";
import { lightTheme, darkTheme } from "../styles/theme";
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import { SPACING, COLORS } from "../styles/constants";

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
  
    return (
      <Modal
        visible={visible}
        onRequestClose={onClose}
        animationType="slide"
        transparent
      >
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            onClose();
        }}
        >
        <View style={styles.modalContainer}> 
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            {isEditing ? (
              <>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={task.title}
                  onChangeText={onChangeTitle}
                  placeholder="Edit Title"
                />
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={task.description}
                  onChangeText={onChangeDescription}
                  placeholder="Edit Description"
                />
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={onSave}>
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={onClose}>
                    <Text style={styles.actionButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  {task.title || "Untitled Task"}
                </Text>
                <Text style={[styles.modalDescription, { color: theme.text }]}>
                  {task.description || "Unspecified Description"}
                </Text>
                <Text style={[styles.modalStatus, { color: theme.text }]}>
                  Status: {task.status || "Unspecified"}
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={onToggleStatus}>
                    <Text style={styles.actionButtonText}>
                      {task.status === "Completed" ? "Mark as Pending" : "Mark as Completed"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={onEditToggle}>
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.modalBackground,
    },
    modalContent: {
      width: "80%",
      padding: SPACING.large,
      elevation: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 8,
      marginBottom: SPACING.medium,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: SPACING.small,
    },
    actionButton: {
      paddingVertical: SPACING.small,
      paddingHorizontal: SPACING.large,
      backgroundColor: COLORS.completed,
      borderRadius: SPACING.small,
    },
    actionButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: SPACING.large,
    },
    modalDescription: {
      fontSize: 16,
      marginBottom: 10,
    },
    modalStatus: {
      fontSize: 14,
      marginBottom: 20,
    },
  });
  
  export default TaskModal;