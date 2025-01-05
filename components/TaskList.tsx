import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { COLORS, FONT_SIZES, ICON_SIZE, RADIUS, SPACING } from "../styles/constants";
import { Task } from "../types/Task";
import { mockTasks } from "../data/mockTasks";
import { TaskStatus } from "../types/TaskStatus";
import { darkTheme, Theme } from "../styles/theme";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskScreenModal";
import AddTaskModal from "./AddTaskModal";
import DropDownPicker from "react-native-dropdown-picker";

const STORAGE_KEY = "@tasks-list";
const MAXID_KEY = "@tasks-maxid";

interface TaskListProps {
  theme: Theme;
}

const TaskList: React.FC<TaskListProps> = ({ theme }) => {
  const dynamicStyles = styles(theme);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [maxId, setMaxId] = useState<number>(0); // to generate unique ids

  // Add task modal
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);

  // show task screen modal
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // to toggle edit mode

  // for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [filterOpen, setFilterOpen] = useState(false);
  // filter options
  const [items, setItems] = useState([
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ]);

  // initial load of tasks from storage or mock data
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = (await loadFromStorage(STORAGE_KEY)) || [];
      const storedMaxId = storedTasks.length
      ? Math.max(...storedTasks.map((task: Task) => task.id))
      : mockTasks.length;
      setTasks(storedTasks.length ? storedTasks : mockTasks);
      setFilteredTasks(storedTasks.length ? storedTasks : mockTasks);
      setMaxId(storedMaxId);
    };
    fetchTasks();
  }, []);

  // save tasks and maxId to storage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
    saveToStorage(MAXID_KEY, maxId);
    applyFilters();
  }, [tasks, maxId, searchQuery, filterStatus]);

  const applyFilters = () => {
    let updatedTasks = tasks;

    // filter by status
    if (filterStatus !== "All") {
      updatedTasks = updatedTasks.filter(
        (task) =>
          task.status ===
          (filterStatus === "Pending"
            ? TaskStatus.Pending
            : TaskStatus.Completed)
      );
    }

    // filter by title
    if (searchQuery) {
      updatedTasks = updatedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(updatedTasks);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
    setNewTitle("");
    setNewDescription("");
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

  const saveTask = () => {
    if (currentTask) {
      if (!currentTask.title || !currentTask.description) {
        Toast.show({
          type: "error",
          text1: "Missing Details",
          text2: "Please enter title and description for the task.",
        });
        return;
      }
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...currentTask } : task
        )
      );
    }
    closeTaskModal();
  };

  const hanldeAddTask = () => {
    // Validate the input fields
    if (!newTitle || !newDescription) {
      Toast.show({
        type: "error",
        text1: "Missing Details",
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
    setMaxId((prev) => prev + 1);
    closeAddModal();

    Toast.show({
      type: "success",
      text1: "Task Added",
    });
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    Toast.show({
      type: "success",
      text1: "Task Deleted"
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
                  : TaskStatus.Completed, // based on current status, toggle
            }
          : task
      )
    );
    Toast.show({
      type: "success",
      text1: "Task Status Updated",
    });
  };

  // Render the task list
  const renderTaskList = () => (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          theme={theme}
          onDelete={handleDeleteTask}
          onPress={() => {
            setCurrentTask(item);
            setTaskModalVisible(true);
          }}
        />
      )}
      ListEmptyComponent={
        <Text style={dynamicStyles.emptyList}>No tasks available</Text>
      }
      contentContainerStyle={{ paddingBottom: 55 }}
    />
  );

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.searchContainer}>
        <TextInput
          style={dynamicStyles.input}
          placeholder="Search tasks"
          placeholderTextColor={theme.placeholder}
          value={searchQuery}
          onChangeText={(text) => {setSearchQuery(text);
            applyFilters}}
        />

        <DropDownPicker
          open={filterOpen}
          value={filterStatus}
          items={items}
          setOpen={setFilterOpen}
          setValue={setFilterStatus}
          setItems={setItems}
          style={dynamicStyles.dropdown}
          dropDownContainerStyle={dynamicStyles.dropdownContainer}
          textStyle={{
            color: theme.text,
            fontSize: FONT_SIZES.dropDownText,
            fontWeight: "bold",
          }}
          labelStyle={{
            fontSize: FONT_SIZES.dropDownText,
          }}
        />
      </View>
      {renderTaskList()}
      {/* Task Modal */}
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
      )}
      {/* Add Task Button */}
      <TouchableOpacity
        style={[dynamicStyles.addButton, { backgroundColor: theme.pending }]}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={dynamicStyles.addButtonText}>+</Text>
      </TouchableOpacity>
      {/* Add Task Modal */}
      {addModalVisible && (
        <AddTaskModal
          visible={addModalVisible}
          theme={theme}
          onClose={closeAddModal}
          onAdd={hanldeAddTask}
          title={newTitle}
          description={newDescription}
          onChangeTitle={setNewTitle}
          onChangeDescription={setNewDescription}
        />
      )}
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING.large,
    paddingBottom: SPACING.large,
    width: "90%",
  },
  emptyList: {
    fontSize: FONT_SIZES.emptyList,
    color: COLORS.emptyList,
    textAlign: "center",
    marginTop: SPACING.large,
  },
  addButton: {
    position: "absolute",
    bottom: SPACING.large,
    right: SPACING.large,
    width: 60,
    height: 60,
    borderRadius: RADIUS.addButton,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    fontSize: ICON_SIZE.addIcon,
    color: "white",
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
    color: theme.text,
    fontSize: FONT_SIZES.button,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.large,
    justifyContent: "flex-start",
  },
  input: {
    width: "60%",
    borderWidth: 1,
    borderColor: theme.border,
    padding: SPACING.medium,
    height: 50,
    borderRadius: RADIUS.medium,
    backgroundColor: theme.inputBackground,
    color: theme.placeholder,
    marginRight: SPACING.medium,
  },
  dropdown: {
    width: "35%",
    height: 50,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: RADIUS.medium,
    backgroundColor: theme.dropdownBackground,
    color: theme.text,
  },
  dropdownContainer: {
    width: "35%",
    marginTop: SPACING.small,
    borderColor: theme.border,
    backgroundColor: theme.dropdownBackground,
    color: theme.text,
  },
  noTasks: {
    textAlign: "center",
    marginTop: SPACING.medium,
    color: theme.text,
  },
});

export default TaskList;
