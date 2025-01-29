"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Drawer } from "vaul";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";

interface dateProps {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
}

export default function VaulDrawer({ date, setDate }: dateProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>(date); // Локальная дата
  const [startDate, setStartDate] = useState("Now"); // Глобальная дата
  const [tempStartTime, setTempStartTime] = useState(startDate); // Локальное время
  const [isOpen, setIsOpen] = useState(false);

  const Months: Record<number, string> = {
    1: "Янв",
    2: "Фев",
    3: "Мар",
    4: "Апр",
    5: "Май",
    6: "Июн",
    7: "Июл",
    8: "Авг",
    9: "Сен",
    10: "Окт",
    11: "Ноя",
    12: "Дек",
  };

  const today = dayjs();

  // Проверка, является ли дата валидной
  const isValidDate = (date: any): date is Date => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Функция для проверки, можно ли выбрать день
  const isDisabled = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Для форматирования месяца
  const monthNumber = isValidDate(date) ? date.getMonth() + 1 : 1;

  // Синхронизация startDate с tempStartDate только по кнопке "ГОТОВО"
  const handleSave = () => {
    setDate(tempDate); // Обновляем глобальное состояние только по кнопке "ГОТОВО"
    setStartDate(tempStartTime); // Обновляем глобальное состояние времени старта
    setIsOpen(false); // Закрываем Drawer
  };

  console.log(tempStartTime);
  console.log(startDate);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      onClose={() => {
        setTempDate(date); // Сброс временной даты при закрытии
        setTempStartTime(startDate); // Сброс временного времени при закрытии
      }}
    >
      <Drawer.Trigger className="mt-2 flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px]">
        <span>Старт</span>
        <span className="text-gray-400">
          {`${
            !isValidDate(date)
              ? "Сейчас >"
              : `${date?.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}.${monthNumber <= 9 ? "0" + monthNumber : monthNumber}.${date?.getFullYear()} >`
          }  `}
        </span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-700 text-white">
              Start
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                value={tempStartTime} // Задаем значение выбранной опции
                onValueChange={(value) => {
                  setTempStartTime(value);
                  if (value === "Now") {
                    setTempDate(new Date()); // Устанавливаем текущую дату
                  } else if (value === "Tomorrow") {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1); // Завтрашняя дата
                    setTempDate(tomorrow);
                  } else if (value === "Own date") {
                    setTempDate(new Date()); // Устанавливаем текущую дату, если выбрано "Своя дата"
                  }
                }}
              >
                <RadioGroupItem
                  value="Now"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  Сейчас
                </RadioGroupItem>
                <RadioGroupItem
                  value="Tomorrow"
                  className="max-h-[40px] w-[90vw] rounded-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  Завтра
                </RadioGroupItem>
                <RadioGroupItem
                  value="Own date"
                  className="flex max-h-[40px] w-[90vw] justify-between rounded-t-none bg-gray-700 p-[10px]"
                >
                  <span>Своя дата</span>
                  {isValidDate(tempDate) &&
                    !dayjs(tempDate).isSame(today, "day") &&
                    !dayjs(tempDate).isSame(today.add(1, "day"), "day") && (
                      <span>{`${tempDate?.getDate() <= 9 ? "0" + tempDate?.getDate() : tempDate?.getDate()} ${Months[monthNumber]}`}</span>
                    )}
                </RadioGroupItem>
              </RadioGroup>

              {/* Календарь появляется только если выбрано "Own date" */}
              {tempStartTime === "Own date" && (
                <div>
                  <Calendar
                    mode="single"
                    selected={tempDate}
                    onSelect={setTempDate}
                    disabled={isDisabled}
                    className="mt-2 flex w-[90vw] items-center justify-center rounded-md border bg-gray-700"
                  />
                </div>
              )}
            </div>

            <div
              className="flex items-center justify-center pl-0 font-extrabold"
              onClick={handleSave} // Сохраняем данные по кнопке "ГОТОВО"
            >
              <div className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-yellow-300 p-5">
                <span>ГОТОВО</span>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
