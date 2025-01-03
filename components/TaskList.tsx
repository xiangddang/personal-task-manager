import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { FONT_SIZES, SPACING } from "../styles/constants";
import { Task } from "../types/Task";
import { mockTasks } from "../data/mockTasks";
import { TaskStatus } from "../types/TaskStatus";
import { Theme } from "../styles/theme";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskScreenModal";
import AddTaskModal from "./AddTaskModal";

const STORAGE_KEY = "@tasks-list";
const MAXID_KEY = "@tasks-maxid";

interface TaskListProps {
  theme: Theme;
}

const TaskList: React.FC<TaskListProps> = ({ theme }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [maxId, setMaxId] = useState<number>(0);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // initial load of tasks from storage or mock data
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadFromStorage(STORAGE_KEY);
      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
        const storedMaxId = Math.max(
          ...storedTasks.map((task: Task) => task.id)
        );
        setMaxId(storedMaxId);
      } else {
        setTasks(mockTasks);
        setMaxId(mockTasks.length);
        await saveToStorage(STORAGE_KEY, mockTasks);
      }
    };
    fetchTasks();
  }, []);

  // save tasks to storage whenever tasks change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage(MAXID_KEY, maxId);
  }, [maxId]);

  const closeAddModal = () => {
    setModalVisible(false);
    setNewTitle("");
    setNewDescription("");
  };

  const openTaskModal = (task: Task) => {
    setCurrentTask(task);
    setTaskModalVisible(true);
    setIsEditing(false); // default to view mode
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
    setCurrentTask(null);
  };

  const saveTask = () => {
    if (currentTask) {
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...currentTask } : task
        )
      );
    }
    closeTaskModal();
  };

  const addTask = () => {
    // Validate the input fields
    if (!newTitle || !newDescription) {
      Toast.show({
        type: "error",
        text1: "Missing Details",
        text2: "Please enter title and description for the task.",
      });
      return;
    }

    const newTask: Task = {
      id: maxId + 1,
      title: newTitle,
      description: newDescription,
      status: TaskStatus.Pending,
    };

    setTasks([...tasks, newTask]);
    setMaxId(maxId + 1);
    closeAddModal();

    Toast.show({
      type: "success",
      text1: "Task Added",
      text2: "Your task has been added successfully!",
    });
  };

  const deleteTask = (id: number) => {
    console.log("deleteTask", id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    Toast.show({
      type: "success",
      text1: "Task Deleted",
      text2: "Your task has been deleted successfully!",
    });
  };

  const toggleStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === TaskStatus.Completed
                  ? TaskStatus.Pending
                  : TaskStatus.Completed,
            }
          : task
      )
    );
    Toast.show({
      type: "success",
      text1: "Task Status Updated",
      text2: "Your task status has been updated successfully!",
    });
  };

  return (
    <View style={styles.container}>
      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            theme={theme}
            onDelete={deleteTask}
            onPress={() => openTaskModal(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyList, { color: theme.text }]}>
            No tasks available
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      {currentTask && taskModalVisible && (
        <TaskModal
          visible={taskModalVisible}
          task={currentTask}
          isEditing={isEditing}
          theme={theme}
          onClose={closeTaskModal}
          onSave={saveTask}
          onToggleStatus={() => {
            toggleStatus(currentTask.id);
            closeTaskModal();
          }}
          onEditToggle={() => setIsEditing(true)}
          onChangeTitle={(text: string) =>
            setCurrentTask({ ...currentTask, title: text })
          }
          onChangeDescription={(text: string) =>
            setCurrentTask({ ...currentTask, description: text })
          }
        />
      )};

      {/* Add Task Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.completed }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Task Modal */}
      {modalVisible && <AddTaskModal
        visible={modalVisible}
        theme={theme}
        onClose={closeAddModal}
        onAdd={addTask}
        title={newTitle}
        description={newDescription}
        onChangeTitle={setNewTitle}
        onChangeDescription={setNewDescription}
      />};
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.large,
    paddingBottom: SPACING.large,
    width: "90%",
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.small,
  },
  actionButton: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.small,
    borderRadius: SPACING.small,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: FONT_SIZES.button,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TaskList;
