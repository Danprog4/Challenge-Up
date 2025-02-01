import React from "react";
import { Link } from "react-router-dom";
import PlusImg from "../assets/images/plus-svgrepo-com.svg";
import { useTasksStore } from "@/stores/TasksStore";
import CheckImg from "../assets/images/icons8-галочка.svg";
import AboutImg from "../assets/images/menu-symbol-of-three-parallel-lines-svgrepo-com (1).svg";
import { calculateDaysSinceStart } from "@/lib/dateUtils";
import { formatDate } from "@/lib/dateUtils";
import { dayBeforeToday } from "@/lib/dateUtils";
import { Months } from "@/monthes";

const InitialPage: React.FC = () => {
  const { tasks, checkDay } = useTasksStore();

  const handleDayClick = (taskId: string, dayCount: number) => {
    checkDay(taskId, dayCount, dayBeforeToday);
  };

  const getDateObject = (dateString: string | Date): Date => {
    return dateString instanceof Date ? dateString : new Date(dateString);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="fixed z-10 flex w-full justify-between bg-black pb-2 pl-5 pr-5 pt-10">
        <Link to={"/about"} className="">
          <img
            src={AboutImg}
            className="h-[20px] w-[20px] object-contain"
            alt="About"
          />
        </Link>
        <Link to={"new"} className="-translate-y-2 translate-x-2">
          <img
            src={PlusImg}
            className="h-[35px] w-[35px] object-contain"
            alt="Add"
          />
        </Link>
      </div>
      {tasks.length === 0 ? (
        <div className="mt-10 flex h-screen flex-col items-center justify-center">
          <Link to={"new"}>
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[100vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400">
              <div className="relative text-center">
                <div className="mb-2 text-4xl font-extrabold text-black">+</div>
                <div className="mb-11 text-3xl font-extrabold text-black">
                  СОЗДАТЬ НОВОЕ <br />
                  ЗАДАНИЕ
                </div>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-4 text-nowrap p-2 text-center text-sm text-gray-400">
            <div>
              У тебя пока нету никаких заданий. Выбери новый <br />
              из списка доступных или создай свой
              <br />
              совершенно новый!
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-24 flex flex-col items-center justify-center gap-2">
          {tasks.map((task, index) => {
            const startDate = getDateObject(task.startDate);
            const daysSinceStart = calculateDaysSinceStart(task.taskDays);

            return (
              <Link
                key={task.id}
                to={`/challenge/${task.id}`}
                className={`${task.color} flex h-[16vh] w-[90vw] items-center justify-between rounded-lg p-3 pr-0 ${index + 1 === tasks.length && "mb-10"}`}
              >
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-black">
                    {task.title}
                  </span>
                  <div className="mt-5 flex">
                    <span className="text-5xl font-extrabold text-black">
                      {daysSinceStart < 0 ? 0 : daysSinceStart}
                    </span>
                    <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
                      <div className="mb-[-7px]">
                        {`${startDate.getDate()} `}
                        {Months[startDate.getMonth() + 1]}
                      </div>
                      <div>
                        /
                        {`${
                          task.regularity === "Everyday"
                            ? task.duration + " дн."
                            : task.duration / 7 + " нед."
                        }`}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="relative flex aspect-square h-[16vh] items-center justify-center gap-2 rounded-full bg-black"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleDayClick(task.id, daysSinceStart);
                    }}
                  >
                    <div className="text-md font-extrabold text-white">
                      {task.userCheckedDays.includes(formatDate(new Date())) ? (
                        <img
                          src={CheckImg}
                          alt="check_image"
                          className="w-[30px]"
                        />
                      ) : (
                        <span>
                          {startDate > new Date() ? (
                            <div className="flex flex-col text-center">
                              <span className="text-xs font-light leading-3">
                                НАЧАЛО
                              </span>
                              <span>
                                {`${startDate.getDate()} `}
                                {Months[startDate.getMonth()]}
                              </span>
                            </div>
                          ) : (
                            <span>ГОТОВО</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InitialPage;
