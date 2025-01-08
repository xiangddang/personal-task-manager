import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SPACING, RADIUS, FONT_SIZES } from "../styles/constants";
import { Theme } from "../styles/theme";
import ModalWrapper from "./ModalWrapper";
import { useTheme } from "../context/ThemeContext";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  title: string;
  description: string;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onClose,
  onAdd,
  title,
  description,
  onChangeTitle,
  onChangeDescription,
}) => {
  const { theme } = useTheme();
  const dynamicStyles = styles(theme);

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
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
        <TouchableOpacity style={dynamicStyles.actionButton} onPress={onAdd}>
          <Text style={dynamicStyles.actionButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.actionButton} onPress={onClose}>
          <Text style={dynamicStyles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
      marginTop: SPACING.micro,
    },
    actionButton: {
      paddingVertical: SPACING.small,
      paddingHorizontal: SPACING.large,
      backgroundColor: theme.pending,
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
  });

export default AddTaskModal;
