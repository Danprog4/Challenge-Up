import { setHours } from "date-fns";
import { newDate } from "react-datepicker/dist/date_utils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Days {
  date: string;
  dayCount: number;
}

export interface Task {
  id: string;
  title: string;
  color: string;
  notifications: boolean;
  notificationText: string;
  duration: number;
  date: Date | undefined;
  regularity: string;
  daysOfWeek: number[];
  taskDays: Days[];
  userCheckedDays: string[];
  startDate: Date;
}

interface TasksStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  getTaskbyId: (id: string) => Task | undefined;
  clearTasks: () => void;
  checkDay: (
    taskId: string,
    day: number,
    dayBeforeToday: (date: string) => boolean,
  ) => void;
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

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      getTaskbyId: (id: string) => {
        return get().tasks.find((task) => task.id === id);
      },
      clearTasks: () => set({ tasks: [] }),

      checkDay: (
        taskId: string,
        dayCount: number,
        dayBeforeToday: (date: string) => boolean,
      ) => {
        const task = get().tasks.find((task) => task.id === taskId);
        if (!task) return;

        const day = task.taskDays.find((day) => day.dayCount === dayCount);
        if (!day) return;

        const isBeforeToday = dayBeforeToday(day.date);

        if (isBeforeToday && !task.userCheckedDays.includes(day.date)) {
          const updatedCheckedDays = [...task.userCheckedDays, day.date];

          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, userCheckedDays: updatedCheckedDays }
                : task,
            ),
          }));
        } else if (isBeforeToday && task.userCheckedDays.includes(day.date)) {
          const updatedCheckedDays = task.userCheckedDays.filter(
            (checkedDate) => checkedDate !== day.date,
          );

          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, userCheckedDays: updatedCheckedDays }
                : task,
            ),
          }));
        }
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useTasksStore };
