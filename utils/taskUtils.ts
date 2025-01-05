import { loadFromStorage } from "./storage";
import { Task } from "../types/Task";
import { mockTasks } from "../data/mockTasks";

export const fetchTaskById = async (
  id: string,
  storageKey: string
): Promise<{ tasks: Task[]; foundTask: Task | null }> => {
  const storedTasks = (await loadFromStorage(storageKey)) || [];
  const foundTask = storedTasks.find((task: Task) => String(task.id) === id) || null;
  return { tasks: storedTasks, foundTask };
};

export const fetchTasks = async (storageKey: string): Promise<{
    tasks: Task[];
    maxId: number;
  }> => {
    const storedTasks = (await loadFromStorage(storageKey)) || [];
    const tasksToUse = storedTasks.length ? storedTasks : mockTasks;
    const maxId = tasksToUse.length
      ? Math.max(...tasksToUse.map((task: Task) => task.id))
      : mockTasks.length;
  
    return { tasks: tasksToUse, maxId };
  };
