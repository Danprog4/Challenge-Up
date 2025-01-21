import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AboutImage from "../assets/images/About.png";
import AddImage from "../assets/images/Add.png";
import { useTasksStore } from "@/stores/TasksStore";

const InitiallPage: React.FC = () => {
  const { tasks, clearTasks } = useTasksStore();

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
          {tasks.map((task) => (
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
                  <span className="text-5xl font-extrabold">1</span>
                  <div className="ml-1 mt-3 flex-col text-sm font-medium text-black">
                    <div className="mb-[-7px]">19 JAN</div>
                    <div>/ 30</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex h-[14vh] w-[30vw] items-center justify-center gap-2 rounded-full bg-black">
                  <div>/</div>
                  <div className="text-md font-extrabold text-white">DONE</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InitiallPage;
