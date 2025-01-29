import { useTasksStore } from "@/stores/TasksStore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "sonner";

const ChallengeInfo: React.FC = () => {
  const { getTaskbyId, checkDay } = useTasksStore();
  const { taskId } = useParams<{ taskId: string }>();
  const task = getTaskbyId(taskId!);

  if (!task) {
    toast("This task cannot be found");
    return;
  }

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`;
  };

  const nowDate = new Date();
  const today = formatDate(nowDate);

  const dayBeforeToday = (date: string): boolean => {
    const dateToCompare = new Date(date);
    return dateToCompare < nowDate;
  };

  const calculateDaysSinceStart = (
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

  const calculateWeeks = (): {
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

  console.log(task.taskDays, "reg");

  return (
    <div>
      <div
        className={`flex min-h-screen flex-col p-[15px] ${task.color} pb-20 pt-10`}
      >
        <div className="mb-10 flex items-center justify-between text-black">
          <Link to={"/"} className="w-[30px]">
            ←
          </Link>
          <span>Задание</span>
          <Link to={`/update/${task.id}`} className="w-[30px]">
            Sett
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="max-w-[70vw] text-3xl font-extrabold text-black">
            {task.title}
          </div>
          <div className="flex flex-col">
            <div className="relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-pink-500">
              <div className="text-[22px] font-extrabold">
                {task.regularity === "Everyday"
                  ? task.duration
                  : Math.ceil(Number(task.duration) / 7)}
              </div>
              <div className="mb-1 mt-[-5px] text-[10px] font-light">
                {task.regularity === "Everyday" ? `DAYS` : `WEEKS`}
              </div>
            </div>
            <div className="relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-pink-500">
              <div className="text-center text-[10px] font-light">
                {task.regularity}
              </div>
            </div>
          </div>
        </div>
        {task.regularity === "Everyday" ? (
          <div className="mb-[75px] grid grid-cols-5 gap-0">
            {task.taskDays.map((day) => {
              console.log(task.userCheckedDays, "tasks");

              const hasChecked = !task.userCheckedDays
                ? false
                : task.userCheckedDays.includes(day.date);

              const isToday =
                formatDate(new Date(day.date)) == today && !hasChecked;

              const hasFailed =
                !isToday && !hasChecked && dayBeforeToday(day.date);

              return (
                <button
                  key={day.date}
                  onClick={() => {
                    checkDay(task.id, day.dayCount, dayBeforeToday);
                    console.log(task.userCheckedDays);
                  }}
                  className={`aspect-square rounded-full border border-black text-lg font-bold ${isToday && "bg-yellow-500"} ${hasFailed && "bg-red-500"} ${hasChecked && "bg-green-500"}`}
                >
                  <span>{day.dayCount}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="">
            {calculateWeeks().map((weekGroup, index) => (
              <div key={index} className="mb-5">
                <h2 className="text-xl font-bold text-black">
                  НЕДЕЛЯ {weekGroup.week}
                </h2>
                <div className="grid grid-cols-5 gap-0">
                  {weekGroup.days.map((day) => {
                    const hasChecked = !task.userCheckedDays
                      ? false
                      : task.userCheckedDays.includes(day.date);

                    const isToday =
                      formatDate(new Date(day.date)) == today && !hasChecked;

                    const hasFailed =
                      !isToday && !hasChecked && dayBeforeToday(day.date);

                    return (
                      <button
                        key={day.date}
                        onClick={() => {
                          checkDay(task.id, day.dayCount, dayBeforeToday);
                          console.log(task.userCheckedDays);
                        }}
                        className={`aspect-square rounded-full border border-black text-lg font-bold ${isToday && "bg-yellow-500"} ${hasFailed && "bg-red-500"} ${hasChecked && "bg-green-500"}`}
                      >
                        <span>{day.dayCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-5">
          <div className="mb-1 border border-black"></div>
          <div className="flex justify-between text-black">
            <div className="text-xs font-light">ПРОЙДЕННЫХ ДНЕЙ</div>
            <div className="text-3xl font-extrabold">
              {calculateDaysSinceStart(task.taskDays)}
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-1 border border-black"></div>
          <div className="flex justify-between text-black">
            <div className="text-xs font-light">МАКСИМАЛЬНОЕ КОМБО</div>
            <div className="text-3xl font-extrabold">0</div>
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-1 border border-black"></div>
          <div className="flex justify-between text-black">
            <div className="text-xs font-light">ВЫПОЛНЕННЫХ ДНЕЙ</div>
            <div className="text-3xl font-extrabold">
              {task.userCheckedDays.length}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pl-0 font-extrabold">
          <Link
            to={`/`}
            className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-500 p-5"
          >
            <div className="">ПРОДОЛЖИТЬ</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengeInfo;
