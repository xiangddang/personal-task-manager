import { Task } from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Buy groceries at Costco",
    description: "Milk, Bagels, Eggs, and Beef",
    status: TaskStatus.Pending,
  },
  {
    id: 2,
    title: "Study React Native",
    description: 'Read official documentation of React Native',
    status: TaskStatus.Completed,
  },
  {
    id: 3,
    title: "Workout",
    description: "30 minutes of yoga",
    status: TaskStatus.Pending,
  },
  {
    id: 4,
    title: "Cook dinner",
    description: "Prepare food for hotpot",
    status: TaskStatus.Pending,
  },
  {
    id: 5,
    title: "Make a plan for new year",
    description: "Plan big trip for year 2025",
    status: TaskStatus.Pending,
  },
  {
    id: 6,
    title: "Have a lovely puppy",
    description: "Adopt a puppy from local shelter",
    status: TaskStatus.Pending,
  }
];
