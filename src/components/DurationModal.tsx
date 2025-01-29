"use client";
import React, { useState } from "react";
import { Drawer } from "vaul";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useCardsStore } from "@/stores/CardsStore";
import { NumericInput } from "@/components/input";

interface DurProps {
  duration: number;
  setDuration: (value: number) => void;
  id?: string;
  regularity: string;
}

export default function VaulDrawer({
  duration,
  setDuration,
  id,
  regularity,
}: DurProps) {
  const { categories } = useCardsStore();
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [inputDuration, setInputDuration] = useState("");
  const [tempDuration, setTempDuration] = useState(duration);
  const [isLong, setIsLong] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  const presetDurations =
    regularity === "Everyday"
      ? card?.duration?.length
        ? card.duration
        : [7, 15, 30, 90]
      : [14, 28, 56, 84];

  // Обработка изменения пользовательского ввода длительности
  const handleDurationChange = (value: string) => {
    setInputDuration(value);
    const durationValue = Number(value);

    // Проверяем пустое значение
    if (!value) {
      setIsLong(false);
      setTempDuration(0);
      return;
    }

    // Устанавливаем флаг превышения максимального значения
    if (regularity === "Everyday") {
      setIsLong(durationValue > 300);
    } else {
      setIsLong(durationValue > 40);
    }

    // Обновляем временное значение только если оно не превышает лимит
    if (!isLong) {
      setTempDuration(durationValue);
    }
  };

  // Сохранение изменений при нажатии кнопки "ГОТОВО"
  const handleSave = () => {
    const finalDuration = isCustomDuration
      ? Number(inputDuration)
      : tempDuration;

    if (!isLong && finalDuration > 0) {
      setDuration(finalDuration);
      setIsOpen(false);
    }
  };

  return (
    <Drawer.Root
      onClose={() => {
        // Сброс к исходным значениям при закрытии
        setTempDuration(duration);
        setInputDuration(duration.toString());
        // Определение режима ввода на основе текущего значения
        if (!presetDurations.includes(duration) && !isLong) {
          setIsCustomDuration(true);
        } else {
          setIsCustomDuration(false);
          setIsLong(false);
        }
        setIsOpen(false);
      }}
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <Drawer.Trigger className="mt-2 flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px]">
        <span>Длительность</span>
        {regularity === "Everyday" ? (
          <span className="text-gray-400">{`${duration} дней >`}</span>
        ) : (
          <span className="text-gray-400">{`${Math.floor(duration / 7)} недель >`}</span>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-700 text-white">
              Длительность
            </div>

            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                value={isCustomDuration ? "Own duration" : String(tempDuration)}
                onValueChange={(value) => {
                  if (value !== "Own duration") {
                    const newDuration = Number(value);
                    setTempDuration(newDuration);
                    setInputDuration("");
                    setIsLong(false);
                    setIsCustomDuration(false);
                  } else {
                    setIsCustomDuration(true);
                  }
                }}
              >
                {presetDurations.map((dur, index) => (
                  <RadioGroupItem
                    key={index}
                    value={String(dur)}
                    className={cn(
                      "border-b-1 max-h-[40px] w-[90vw] rounded-b-none border border-gray-600 bg-gray-700 p-[10px]",
                      index + 1 === presetDurations.length &&
                        "border-b-none rounded-b-none rounded-t-none",
                      index !== 0 &&
                        index + 1 !== presetDurations.length &&
                        "rounded-none",
                    )}
                  >
                    {regularity === "Everyday"
                      ? `${dur} дней`
                      : `${Math.floor(dur / 7)} недель`}
                  </RadioGroupItem>
                ))}
                <RadioGroupItem
                  value="Own duration"
                  className="max-h-[40px] w-[90vw] rounded-t-none border border-gray-600 bg-gray-700 p-[10px]"
                >
                  Своя длительность
                </RadioGroupItem>
              </RadioGroup>

              {isCustomDuration && (
                <div
                  className={cn(
                    "mt-2 flex w-[90vw] flex-col items-start justify-center rounded-md border-2 border-gray-600 bg-gray-700 text-start text-sm font-medium text-white",
                    isLong ? "h-[60px]" : "h-[40px]",
                  )}
                >
                  <NumericInput
                    amountValue={inputDuration}
                    onAmountChange={handleDurationChange}
                    unit={regularity === "Everyday" ? "days" : "weeks"}
                    placeholder="Duration"
                  />

                  {isLong && (
                    <div className="text-sm text-red-600">
                      {regularity === "Everyday"
                        ? "Максимум 300 дней"
                        : "Максимум 40 недель"}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center pl-0 font-extrabold">
              <button
                className={cn(
                  "fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-yellow-300 p-5",
                  (isLong || !tempDuration) &&
                    "cursor-not-allowed bg-yellow-200",
                )}
                onClick={handleSave}
                disabled={isLong || !tempDuration}
              >
                <span
                  className={isLong || !tempDuration ? "text-gray-500" : ""}
                >
                  ГОТОВО
                </span>
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
