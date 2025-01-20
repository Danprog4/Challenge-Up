import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Импортируем стандартные стили

export const CalendarDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Обработчик выбора даты
  const handleDateChange = (date: Date | null) => {
    if (date && selectedDate?.getTime() === date.getTime()) {
      return; // Если дата уже выбрана, не делать изменений
    }
    setSelectedDate(date); // Устанавливаем новую выбранную дату
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange} // Обработчик выбора даты
      inline // Отображение календаря в развернутом виде
      highlightDates={selectedDate ? [selectedDate] : []} // Подсветка выбранной даты
      calendarClassName="custom-calendar" // Применяем кастомный класс
      dayClassName={(date) =>
        date.getTime() === selectedDate?.getTime() ? "selected-day" : ""
      } // Класс для выбранной даты
    />
  );
};
