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
import { saveToStorage } from "../utils/storage";
import {
  COLORS,
  FONT_SIZES,
  ICON_SIZE,
  RADIUS,
  SPACING,
} from "../styles/constants";
import { Task } from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";
import { Theme } from "../styles/theme";
import TaskItem from "./TaskItem";
import AddTaskModal from "./AddTaskModal";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { taskEventEmitter } from "../utils/taskEventEmitter";
import { fetchTasks } from "../utils/taskUtils";

const STORAGE_KEY = "@tasks-list";
const MAXID_KEY = "@tasks-maxid";

interface TaskListProps {
  theme: Theme;
}

const TaskList: React.FC<TaskListProps> = ({ theme }) => {
  const router = useRouter();
  const dynamicStyles = styles(theme);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [maxId, setMaxId] = useState<number>(0); // to generate unique ids

  // Add task modal
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);

  // for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [filterOpen, setFilterOpen] = useState(false);

  // filter options
  const [options, setOptions] = useState([
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ]);

  const loadTasks = async () => {
    const { tasks, maxId } = await fetchTasks(STORAGE_KEY);
    setTasks(tasks);
    setMaxId(maxId);
  };

  // initial load of tasks from storage or mock data
  useEffect(() => {
    loadTasks();
  }, []);

  // listen for task updates
  useEffect(() => {
    taskEventEmitter.on("taskUpdated", loadTasks);

    return () => {
      taskEventEmitter.off("taskUpdated", loadTasks);
    };
  }, []);

  // save tasks and maxId to storage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
    saveToStorage(MAXID_KEY, maxId);
    applyFilters();
  }, [tasks, maxId, searchQuery, filterStatus]);

  const applyFilters = () => {
    const updatedTasks = tasks
      .filter(
        // filter based on status
        (task) =>
          filterStatus === "All" ||
          task.status ===
            (filterStatus === "Pending"
              ? TaskStatus.Pending
              : TaskStatus.Completed)
      )
      .filter((task) =>
        // search based on titled
        searchQuery
          ? task.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      );

    setFilteredTasks(updatedTasks);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
    setNewTitle("");
    setNewDescription("");
  };

  const handleNavigateToTaskScreen = (id: number) => {
    router.push(`/task/${id}`);
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
      text1: "Task Deleted",
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
          onDelete={handleDeleteTask}
          onPress={() => {
            handleNavigateToTaskScreen(item.id);
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
          onChangeText={(text) => {
            setSearchQuery(text);
            applyFilters();
          }}
        />

        <DropDownPicker
          open={filterOpen}
          value={filterStatus}
          items={options}
          setOpen={setFilterOpen}
          setValue={setFilterStatus}
          setItems={setOptions}
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

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: SPACING.large,
      paddingBottom: SPACING.large,
      width: "90%",
      overflow: "hidden",
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
      elevation: 5, // for Android
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
