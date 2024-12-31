import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { mockTasks } from "./data/mockTasks";

const { height: screenHeight } = Dimensions.get("window");

const dynamicPaddingTop = screenHeight * 0.08;


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <FlatList
        data={mockTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text
              style={[
                styles.taskStatus,
                item.status === 'Completed' ? styles.completed : styles.pending,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: dynamicPaddingTop,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#666',
    marginBottom: 10,
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
});
