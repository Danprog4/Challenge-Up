"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Drawer } from "vaul";

interface RegProps {
  regularity: string;
  setRegularity: (value: string) => void;
  daysOfWeek: number[];
  setDaysOfWeek: (value: number[]) => void;
}

export default function VaulDrawer({
  regularity,
  setRegularity,
  daysOfWeek,
  setDaysOfWeek,
}: RegProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [outputDays, setOutputDays] = useState<string[]>([]);
  const [tempOutputDays, setTempOutputDays] = useState<string[]>(outputDays);
  const [tempRegularity, setTempRegularity] = useState(regularity); // Храним временное состояние для регулярности
  const [tempDaysOfWeek, setTempDaysOfWeek] = useState(daysOfWeek); // Храним временные дни недели

  // Обработчик для изменения регулярности
  const handleChangleRegularity = (option: string) => {
    if (option === "Everyday") {
      setTempDaysOfWeek([]);
      setTempOutputDays([]);
    }
    setTempRegularity(option);
  };

  const handleToggle = (day: number, dayName: string) => {
    if (tempDaysOfWeek.includes(day)) {
      setTempDaysOfWeek([...tempDaysOfWeek.filter((item) => day !== item)]);
      setTempOutputDays([...tempOutputDays.filter((item) => dayName !== item)]);
    } else {
      setTempDaysOfWeek([...tempDaysOfWeek, day]);
      setTempOutputDays([...tempOutputDays, dayName]);
    }
  };

  const handleSaveChanges = () => {
    if (
      tempRegularity !== regularity ||
      tempDaysOfWeek.length !== daysOfWeek.length ||
      tempDaysOfWeek.length !== outputDays.length
    ) {
      setRegularity(tempRegularity);
      setDaysOfWeek(tempDaysOfWeek);
      setOutputDays(tempOutputDays);
    }
    setIsOpen(false);
  };

  console.log(outputDays, "true");
  console.log(tempOutputDays, "flase");

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      onClose={() => {
        setTempRegularity(regularity);
        setTempDaysOfWeek(daysOfWeek);
        setTempOutputDays(outputDays);
      }}
    >
      <Drawer.Trigger className="flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px]">
        <span>Регулярность</span>
        <span className="text-gray-400">
          {tempRegularity === "Few times a week"
            ? `${tempDaysOfWeek.length} раз в неделю >`
            : `Каждый день >`}
        </span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-700 text-white">
              Регулярность
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                defaultValue={tempRegularity}
                onValueChange={(value) => handleChangleRegularity(value)}
              >
                <RadioGroupItem
                  value="Everyday"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  Каждый день
                </RadioGroupItem>
                <RadioGroupItem
                  value="Few times a week"
                  className="max-h-[40px] w-[90vw] rounded-t-none bg-gray-700 p-[10px]"
                >
                  Несколько раз в неделю
                </RadioGroupItem>
              </RadioGroup>
              {tempRegularity === "Few times a week" && (
                <div className="text- mt-2 flex flex-col items-start text-start">
                  {[
                    "Понедельник",
                    "Вторник",
                    "Среда",
                    "Четверг",
                    "Пятница",
                    "Суббота",
                    "Воскресенье",
                  ].map((dayName, index) => {
                    const day = index;
                    return (
                      <div
                        key={day}
                        className="flex h-[40px] w-[90vw] items-center rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium"
                      >
                        <div
                          className={cn(
                            "text-gray-300",
                            tempDaysOfWeek.includes(day) && "text-yellow-500",
                          )}
                          onClick={() => handleToggle(day, dayName)}
                        >
                          {dayName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {tempDaysOfWeek.length > 0 && tempDaysOfWeek.length <= 6 && (
                <div className="mt-3 w-[90vw] text-wrap text-start text-sm font-light">
                  Задание будет повторяться в следующие <br /> дни:{" "}
                  {tempOutputDays.join(", ").toLowerCase()}
                </div>
              )}
              {tempDaysOfWeek.length === 7 && tempRegularity !== "Everyday" && (
                <div className="mt-3 w-[90vw] text-start text-sm font-light">
                  Задание будет повторяться каждый день
                </div>
              )}
            </div>
            <div
              className="flex items-center justify-center pl-0 font-extrabold"
              onClick={handleSaveChanges}
            >
              <div className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-yellow-300 p-5">
                <span
                  className={`${tempDaysOfWeek.length === 0 && tempRegularity !== "Everyday" && "text-gray-500"}`}
                >
                  ГОТОВО
                </span>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
