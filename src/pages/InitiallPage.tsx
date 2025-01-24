import React, { useState } from "react";
import { Link } from "react-router-dom";
import AboutImage from "../assets/images/About.png";
import AddImage from "../assets/images/Add.png";
import { useTasksStore } from "@/stores/TasksStore";
import CheckImg from "../assets/images/icons8-галочка.svg";

const InitiallPage: React.FC = () => {
  const { tasks, checkDay } = useTasksStore();

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

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`;
  };

  const handleDayClick = (taskId: string, dayCount: number) => {
    const nowDate = new Date();

    const dayBeforeToday = (date: string): boolean => {
      const dateToCompare = new Date(date);
      return dateToCompare < nowDate;
    };

    checkDay(taskId, dayCount, dayBeforeToday);
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-between">
        <Link to={"/"}>
          <img src={AboutImage} className="h-[50px] w-[60px]" alt="About" />
        </Link>
        <Link to={"new"}>
          <img src={AddImage} className="h-[50px] w-[60px]" alt="Add" />
        </Link>
      </div>
      {tasks.length === 0 ? (
        <div className="justify- mt-10 flex h-screen flex-col items-center justify-center">
          <Link to={"new"}>
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[100vw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400">
              <div className="relative text-center">
                <div className="mb-2 text-4xl font-extrabold text-black">+</div>
                <div className="mb-11 text-3xl font-extrabold text-black">
                  CREATE NEW <br />
                  CHALLENGE
                </div>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-4 text-nowrap p-2 text-center text-sm text-gray-400">
            <div>
              You don't have any challenges yet. Choose a new <br />
              challenge from a list of available challenges or create a <br />
              completely new one!
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          {tasks.map((task) => {
            const daysSinceStart = calculateDaysSinceStart(task.taskDays);
            return (
              <Link
                key={task.id}
                to={`/challenge/${task.id}`}
                className={`${task.color} flex h-[14vh] w-[90vw] items-center justify-between rounded-lg p-3`}
              >
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-black">
                    {task.title}
                  </span>
                  <div className="mt-5 flex">
                    <span className="text-5xl font-extrabold">
                      {daysSinceStart < 0 ? 0 : daysSinceStart}
                    </span>
                    <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
                      <div className="mb-[-7px]">19 JAN</div>
                      <div>/ {task.duration}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="relative flex h-[14vh] w-[30vw] items-center justify-center gap-2 rounded-full bg-black"
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
                        <span>DONE</span>
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

export default InitiallPage;
