import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { COLORS, FONT_SIZES, SPACING } from "../styles/constants";
import { Task } from "../types/Task";
import { mockTasks } from "../data/mockTasks";
import { TaskStatus } from "../types/TaskStatus";
import { lightTheme, darkTheme } from "../styles/theme";
import TaskItem from "./TaskItem";

const STORAGE_KEY = "@tasks-list";

interface TaskListProps {
  theme: typeof lightTheme | typeof darkTheme;
}

const TaskList: React.FC<TaskListProps> = ({theme}) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadFromStorage(STORAGE_KEY);
      setTasks(storedTasks || mockTasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  const closeAddModal = () => {
    setModalVisible(false);
    setNewTitle("");
    setNewDescription("");
  }

  const addTask = () => {
    if (!newTitle || !newDescription) {
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title: newTitle,
      description: newDescription,
      status: TaskStatus.Pending,
    };

    setTasks([...tasks, newTask]);
    closeAddModal();
  }

  return (
    <View style={styles.container}>
      
    
    <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (<TaskItem task={item} theme={theme} />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyList, { color: theme.text }]}>
            No tasks available
          </Text>
        }
      />
      {/* Add Task Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.completed }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >

        <TouchableWithoutFeedback onPress={() => {closeAddModal(), Keyboard.dismiss}}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Add a New Task</Text>
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Task Title"
              placeholderTextColor="#aaa"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Task Description"
              placeholderTextColor="#aaa"
              value={newDescription}
              onChangeText={setNewDescription}
            />
            <View style={styles.buttonRow}>
              <Button title="Add" onPress={addTask} />
              <Button title="Cancel" color={COLORS.pending} onPress={() => closeAddModal()} />
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  emptyList: {
    fontSize: FONT_SIZES.emptyList,
    color: "#888",
    textAlign: "center",
    marginTop: SPACING.large,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: SPACING.large,
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
});

export default TaskList;
