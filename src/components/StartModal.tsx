"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDemo } from "./calendar2";

interface dateProps {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
}

export default function VaulDrawer({ date, setDate }: dateProps) {
  const [startDate, setStartDate] = useState("Now");
  const [isOpen, setIsOpen] = useState(false);

  const Months: Record<number, string> = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const isDisabled = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const monthNumber = date ? date.getMonth() + 1 : 1;

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="mt-2 flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px]">
        <span>Start</span>
        <span className="text-gray-400">
          {`${
            !date
              ? "Now >"
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
                defaultValue={startDate}
                onValueChange={(value) => setStartDate(value)}
              >
                <RadioGroupItem
                  value="Now"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  Now
                </RadioGroupItem>
                <RadioGroupItem
                  value="Tommorow"
                  className="max-h-[40px] w-[90vw] rounded-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  Tommorow
                </RadioGroupItem>
                <RadioGroupItem
                  value="Own date"
                  className="flex max-h-[40px] w-[90vw] justify-between rounded-t-none bg-gray-700 p-[10px]"
                >
                  <span>Own date</span>
                  {date && (
                    <span>{`${date?.getDate()} ${Months[monthNumber]}`}</span>
                  )}
                </RadioGroupItem>
              </RadioGroup>
              {startDate === "Own date" && (
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isDisabled}
                    className="mt-2 flex w-[90vw] items-center justify-center rounded-md border bg-gray-700"
                  />
                  {/* <CalendarDemo /> */}
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
