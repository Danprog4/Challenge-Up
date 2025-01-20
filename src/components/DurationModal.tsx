"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTasksStore } from "@/stores/TasksStore";
import { title } from "process";
import React, { useState } from "react";
import { Drawer } from "vaul";

interface DurProps {
  duration: number;
  setDuration: (value: number) => void;
}

export default function VaulDrawer({ duration, setDuration }: DurProps) {
  //   const { tasks, addTask } = useTasksStore();
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [inputValue, setInputValue] = useState("Duration");
  const [isFocus, setIsFocus] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (inputValue === "Duration") {
      setInputValue("");
    }
  };

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const value = (event.target as HTMLElement).innerText;
    const numValue = Number(value);

    setInputValue(value);
    setDuration(numValue);
  };

  const handleBlur = () => {
    setIsFocus(false);
    if (Number(inputValue) > 300) {
      setIsLong(true);
      setDuration(30);
    } else {
      setIsLong(false);
    }
    return isLong;
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  return (
    <Drawer.Root
      onClose={() => {
        if ((isCustomDuration && inputValue === "") || duration === 0) {
          setDuration(30);
          setInputValue("Duration");
          setIsCustomDuration(false);
        } else if (!isCustomDuration && inputValue === "") {
          setInputValue("Duration");
        }
      }}
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <Drawer.Trigger className="mt-2 flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px]">
        <span>Duration</span>
        <span className="text-gray-400">{`${duration} days >`}</span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-700 text-white">
              Duration
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                defaultValue={
                  isCustomDuration ? "Own duration" : String(duration)
                }
                onValueChange={(value) => {
                  setDuration(Number(value));
                  setIsLong(false);
                  setIsCustomDuration(value === "Own duration");
                }}
              >
                <RadioGroupItem
                  value="15"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  15 days
                </RadioGroupItem>
                <RadioGroupItem
                  value="30"
                  className="max-h-[40px] w-[90vw] rounded-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  30 days
                </RadioGroupItem>
                <RadioGroupItem
                  value="90"
                  className="max-h-[40px] w-[90vw] rounded-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  90 days
                </RadioGroupItem>
                <RadioGroupItem
                  value="Own duration"
                  className="max-h-[40px] w-[90vw] rounded-t-none bg-gray-700 p-[10px]"
                >
                  Own duration
                </RadioGroupItem>
              </RadioGroup>
              {isCustomDuration && (
                <div
                  className={`mt-2 flex h-[40px] w-[90vw] flex-col items-start justify-center rounded-md border-2 border-gray-600 bg-gray-700 p-[10px] text-start text-sm font-medium ${isLong && inputValue !== "" && !Number.isNaN(inputValue) && "h-[60px]"} text-white`}
                >
                  <div className="flex">
                    <div
                      onClick={handleClick}
                      contentEditable={true}
                      onInput={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      className={`w-fit border-none bg-transparent outline-none focus:ring-0 ${!isCustomDuration && "w-[70px]"} pr-2`}
                    >
                      {inputValue}
                    </div>
                    {!isFocus &&
                      inputValue !== "Duration" &&
                      inputValue !== "" && <span>days</span>}
                  </div>
                  {isLong && inputValue !== "" && (
                    <div className="text-sm text-red-600">
                      Maximum duration 300 days
                    </div>
                  )}
                </div>
              )}
            </div>
            <div
              className="flex items-center justify-center pl-0 font-extrabold"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-yellow-300 p-5">
                <span>DONE</span>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
