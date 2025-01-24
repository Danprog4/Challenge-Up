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

  const handleChangleRegularity = (option: string) => {
    if (option === "Everyday") {
      setDaysOfWeek([]);
    }
    setRegularity(option.toString());
  };

  const handleToggle = (day: number) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek([...daysOfWeek.filter((item) => day !== item)]);
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="flex w-[90vw] justify-between rounded-md bg-gray-700 p-[10px]">
        <span>Regularity</span>
        <span className="text-gray-400">
          {regularity === "Few times a week"
            ? `${daysOfWeek.length} times a week >`
            : `${regularity} >`}
        </span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="h-full bg-black">
            <div className="mb-4 flex h-[13vw] items-center justify-center bg-gray-700 text-white">
              Regularity
            </div>
            <div className="flex flex-col items-center justify-center text-gray-300">
              <RadioGroup
                defaultValue={regularity}
                onValueChange={(value) => handleChangleRegularity(value)}
              >
                <RadioGroupItem
                  value="Everyday"
                  className="max-h-[40px] w-[90vw] rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px]"
                >
                  Everyday
                </RadioGroupItem>
                <RadioGroupItem
                  value="Few times a week"
                  className="max-h-[40px] w-[90vw] rounded-t-none bg-gray-700 p-[10px]"
                >
                  Few times a week
                </RadioGroupItem>
              </RadioGroup>
              {regularity === "Few times a week" && (
                <div className="text- mt-2 flex flex-col items-start text-start">
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-none rounded-t-md border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(1) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(1)}
                    >
                      Monday
                    </div>
                  </div>
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(2) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(2)}
                    >
                      Tuesday
                    </div>
                  </div>
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(3) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(3)}
                    >
                      Wednesday
                    </div>
                  </div>
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(4) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(4)}
                    >
                      Thursday
                    </div>
                  </div>
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(5) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(5)}
                    >
                      Friday
                    </div>
                  </div>
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-none border-b-2 border-gray-600 bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(6) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(6)}
                    >
                      Saturday
                    </div>
                  </div>
                  <div className="flex h-[40px] w-[90vw] items-center rounded-b-md rounded-t-none bg-gray-700 p-[10px] text-sm font-medium">
                    <div
                      className={cn(
                        "text-gray-300",
                        daysOfWeek.includes(0) && "text-yellow-500",
                      )}
                      onClick={() => handleToggle(0)}
                    >
                      Sunday
                    </div>
                  </div>
                </div>
              )}
              {daysOfWeek.length > 0 && daysOfWeek.length <= 6 && (
                <div className="mt-3 w-[90vw] text-wrap text-start text-sm font-light">
                  Challenge wiil be repeated every week in the next <br /> days:{" "}
                  {daysOfWeek.join(", ").toLowerCase()}
                </div>
              )}
              {daysOfWeek.length === 7 && regularity !== "Everyday" && (
                <div className="mt-3 w-[90vw] text-start text-sm font-light">
                  Challenge will be repeated every day
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
