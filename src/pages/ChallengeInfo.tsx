import { useTasksStore } from "@/stores/TasksStore";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { calculateDaysSinceStart } from "@/lib/dateUtils";
import { formatDate } from "@/lib/dateUtils";
import { dayBeforeToday } from "@/lib/dateUtils";
import { calculateWeeks } from "@/lib/dateUtils";
import { calculateNextDay } from "@/lib/dateUtils";
import SettingImg from "../assets/images/settings-svgrepo-com.svg";

const ChallengeInfo: React.FC = () => {
  const { getTaskbyId, checkDay } = useTasksStore();
  const { taskId } = useParams<{ taskId: string }>();
  const task = getTaskbyId(taskId!);
  const nowDate = new Date();
  const today = formatDate(nowDate);

  if (!task) {
    toast("Задача не найдена");
    return;
  }

  console.log(task.taskDays[0].date);
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
          <Link to={`/update/${task.id}`} className="h-[30px]">
            <img src={SettingImg} alt="Наст" className="w-[30px]" />
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
                {task.regularity === "Everyday" ? `ДН.` : `НЕД.`}
              </div>
            </div>
            <div className="relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-pink-500">
              <div className="text-wrap text-center text-[10px] font-light">
                {task.regularity === "Everyday"
                  ? "Каждый день"
                  : "Несколько раз в неделю"}
              </div>
            </div>
          </div>
        </div>
        {task.regularity === "Everyday" ? (
          <div className="mb-[75px] grid grid-cols-5 gap-0">
            {task.taskDays.map((day) => {
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
                  className={`aspect-square rounded-full border border-black text-lg font-bold text-black ${isToday && "bg-yellow-500"} ${hasFailed && "bg-red-500"} ${hasChecked && "bg-green-500"}`}
                >
                  <span>{day.dayCount}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="">
            {calculateWeeks(task).map((weekGroup, index) => (
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
                        className={`aspect-square rounded-full border border-black text-lg font-bold text-black ${isToday && "bg-yellow-500"} ${hasFailed && "bg-red-500"} ${hasChecked && "bg-green-500"}`}
                      >
                        <span className="">{day.dayCount}</span>
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
              {calculateDaysSinceStart(task.taskDays) < 0
                ? 0
                : calculateDaysSinceStart(task.taskDays)}
            </div>
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
        <div className="mb-5">
          <div className="mb-1 border border-black"></div>
          <div className="flex justify-between text-black">
            <div className="text-xs font-light">СЛЕДУЮЩИЙ ДЕНЬ</div>
            <div className="text-3xl font-extrabold">
              {calculateNextDay(
                task.regularity,
                new Date(),
                task.taskDays,
                task.userCheckedDays,
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pl-0 font-extrabold">
          <Link
            to={`/`}
            className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-500 p-5"
          >
            <div>ПРОДОЛЖИТЬ</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengeInfo;
