import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  color: string;
  notifications: boolean;
  notificationText: string;
  duration: number;
  date: Date | undefined;
  regularity: string;
  daysOfWeek: string[];
}

interface TasksStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  getTaskbyId: (id: string) => Task | undefined;
  clearTasks: () => void;
}

const useTasksStore = create<TasksStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task: Task) => {
        if (!get().tasks.find((t) => t.id === task.id)) {
          set((state) => ({
            tasks: [...state.tasks, task],
          }));
        }
      },

      updateTask: (id: string, updatedTask: Task) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        }));
      },

      getTaskbyId: (id: string) => {
        return get().tasks.find((task) => task.id === id);
      },
      clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useTasksStore };
