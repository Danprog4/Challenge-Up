import dayjs from "dayjs";
import { Days, Task } from "@/stores/TasksStore";

export const calculateDaysSinceStart = (
  taskDays: { date: string; dayCount: number }[],
): number => {
  if (taskDays.length === 0) {
    return 0;
  }

  const startDate = new Date(taskDays[0].date);
  const today = new Date();

  const timeDifference = today.getTime() - startDate.getTime();
  const daysSinceStart = Math.floor(timeDifference / (1000 * 3600 * 24));

  return daysSinceStart + 1;
};

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`;
};

export const dayBeforeToday = (date: string): boolean => {
  const dateToCompare = new Date(date);
  return dateToCompare < new Date();
};

export const getDatesForDaysOfWeek = (
  startDate: Date,
  duration: number,
  selectedDays: number[],
  regularity: string,
) => {
  const taskDays: Days[] = [];
  let currentDate = dayjs(startDate);
  let dayCount = 1;

  if (regularity !== "Everyday") {
    for (let i = 0; i < duration; i++) {
      if (selectedDays.includes(currentDate.day())) {
        taskDays.push({
          date: currentDate.format("YYYY-MM-DD"),
          dayCount,
        });
        dayCount++;
      }
      currentDate = currentDate.add(1, "day");
    }
  } else {
    for (let i = 0; i < duration; i++) {
      taskDays.push({
        date: currentDate.format("YYYY-MM-DD"),
        dayCount,
      });
      dayCount++;

      currentDate = currentDate.add(1, "day");
    }
  }

  return taskDays;
};

export const calculateWeeks = (
  task: Task,
): {
  week: number;
  days: { date: string; dayCount: number }[];
}[] => {
  const weeks = [];
  let currentWeek = [];
  const daysPerWeek = task.daysOfWeek.length;

  for (let i = 0; i < task?.taskDays.length; i++) {
    if (i > 0 && i % daysPerWeek === 0) {
      weeks.push({ week: weeks.length + 1, days: currentWeek });
      currentWeek = [];
    }

    currentWeek.push(task.taskDays[i]);
  }

  if (currentWeek.length > 0) {
    weeks.push({ week: weeks.length + 1, days: currentWeek });
  }

  return weeks;
};
export const calculateNextDay = (
  regularity: string,
  currentDate: Date,
  taskDays: { date: string; dayCount: number }[],
  userCheckedDays: string[],
): string => {
  if (taskDays.length === 0) return "Нету";

  const today = formatDate(new Date());
  const formattedCurrentDate = formatDate(currentDate);

  // Найдем ближайшую доступную дату
  const nextAvailableDay = taskDays.find(
    (task) =>
      !userCheckedDays.includes(task.date) && task.date >= formattedCurrentDate,
  );

  if (!nextAvailableDay) return "Нету";

  // Если ближайший доступный день — сегодня
  if (nextAvailableDay.date === today) return "Сегодня";

  // Если ближайший доступный день — завтра
  const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  if (nextAvailableDay.date === tomorrow) return "Завтра";

  // Рассчитываем разницу в днях
  const daysUntilNext = Math.ceil(
    (Date.parse(nextAvailableDay.date) - currentDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return `Через ${daysUntilNext} ${daysUntilNext === 1 ? "день" : "дня"}`;
};
