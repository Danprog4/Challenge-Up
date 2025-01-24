import { useState, useEffect } from "react";

// Хук для форматирования даты
export const useTaskDayNumber = (date: Date | null): string => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
      const year = date.getFullYear();

      // Форматируем день и месяц, добавляя ведущий ноль, если нужно
      const formattedDay = day <= 9 ? "0" + day : day;
      const formattedMonth = month <= 9 ? "0" + month : month;

      setFormattedDate(`${formattedDay}.${formattedMonth}.${year}`);
    } else {
      setFormattedDate("");
    }
  }, [date]);

  return formattedDate;
};
