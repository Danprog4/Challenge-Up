"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Drawer } from "vaul";

export default function VaulDrawer() {
  const [regularity, setRegularity] = useState("Everyday");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);

  const handleToggle = (day: string) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek([...daysOfWeek.filter((item) => day !== item)]);
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  return (
    <Drawer.Root>
      <Drawer.Trigger>Open Drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-gray-100 outline-none">
          <div className="bg-white p-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <RadioGroup
                defaultValue="Everyday"
                onValueChange={(value) => setRegularity(value)}
              >
                <RadioGroupItem value="Everyday">Everyday</RadioGroupItem>
                <RadioGroupItem value="Few times a week">
                  Few times a week
                </RadioGroupItem>
              </RadioGroup>
              {regularity === "Few times a week" && (
                <div className="">
                  <div
                    className={cn(
                      "text-black",
                      daysOfWeek.includes("Monday") && "text-yellow-500",
                    )}
                    onClick={() => handleToggle("Monday")}
                  >
                    Monday
                  </div>
                  <div
                    className={cn(
                      "text-black",
                      daysOfWeek.includes("Tuesday") && "text-yellow-500",
                    )}
                    onClick={() => handleToggle("Tuesday")}
                  >
                    Tuesday
                  </div>
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
