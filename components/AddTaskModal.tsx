import React from "react";
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { COLORS, SPACING } from "../styles/constants";
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
}) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            onClose();
        }}
    >
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.modalTitle, { color: theme.text }]}>Add a New Task</Text>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Task Title"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={onChangeTitle}
        />
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Task Description"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={onChangeDescription}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={onAdd}>
            <Text style={styles.actionButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onClose}>
            <Text style={styles.actionButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 8,
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
});

export default AddTaskModal;
