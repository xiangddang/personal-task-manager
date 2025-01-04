import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS, SPACING, RADIUS, FONT_SIZES } from "../styles/constants";
import { Theme } from "../styles/theme";

interface AddTaskModalProps {
  visible: boolean;
  theme: Theme;
  onClose: () => void;
  onAdd: () => void;
  title: string;
  description: string;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  theme,
  onClose,
  onAdd,
  title,
  description,
  onChangeTitle,
  onChangeDescription,
}) => {
  const dynamicStyles = styles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Dismiss the keyboard and close the modal when tapping outside the modal */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View style={dynamicStyles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            <Text style={dynamicStyles.modalTitle}>Add a New Task</Text>
            <TextInput
              style={dynamicStyles.input}
              placeholder="Task Title"
              placeholderTextColor={theme.placeholder}
              value={title}
              onChangeText={onChangeTitle}
            />
            <TextInput
              style={dynamicStyles.input}
              placeholder="Task Description"
              placeholderTextColor={theme.placeholder}
              value={description}
              onChangeText={onChangeDescription}
            />
            <View style={dynamicStyles.buttonRow}>
              <TouchableOpacity
                style={dynamicStyles.actionButton}
                onPress={onAdd}
              >
                <Text style={dynamicStyles.actionButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={dynamicStyles.actionButton}
                onPress={onClose}
              >
                <Text style={dynamicStyles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.modalBackground,
    },
    modalContent: {
      width: "80%",
      padding: SPACING.large,
      borderRadius: RADIUS.small,
      elevation: 5,
      backgroundColor: theme.cardBackground,
      color: theme.text,
    },
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
      backgroundColor: COLORS.completed,
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
    },
  });

export default AddTaskModal;
