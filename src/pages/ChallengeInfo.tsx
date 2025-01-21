import { useTasksStore } from "@/stores/TasksStore";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ChallengeInfo: React.FC = () => {
  const { getTaskbyId } = useTasksStore();
  const { taskId } = useParams<{ taskId: string }>();
  const task = getTaskbyId(taskId!);
  const days = Array.from(
    { length: task?.duration || 30 },
    (_, index) => index + 1,
  );

  return (
    <div>
      {!task ? (
        <div>Task is not found</div>
      ) : (
        <div
          className={`flex min-h-screen flex-col p-[15px] ${task.color} pb-20 pt-10`}
        >
          <div className="mb-10 flex items-center justify-between text-black">
            <Link to={"/"} className="w-[30px]">
              Back
            </Link>
            <span>Challenge</span>
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
                  {task.duration}
                </div>
                <div className="mb-1 mt-[-5px] text-[10px] font-light">
                  DAYS
                </div>
              </div>
              <div className="relative flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-pink-500">
                <div className="text-[10px] font-light">
                  EVERY <br></br> DAY
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[75px] grid grid-cols-5 gap-0">
            {days.map((day, index) => (
              <div
                className="flex aspect-square w-full items-center justify-center rounded-full border border-black text-lg font-extrabold text-black"
                key={index}
              >
                <span>{day}</span>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <div className="mb-1 border border-black"></div>
            <div className="flex justify-between text-black">
              <div className="text-xs font-light">PASSED DAYS</div>
              <div className="text-3xl font-extrabold">0</div>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-1 border border-black"></div>
            <div className="flex justify-between text-black">
              <div className="text-xs font-light">PASSED DAYS</div>
              <div className="text-3xl font-extrabold">0</div>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-1 border border-black"></div>
            <div className="flex justify-between text-black">
              <div className="text-xs font-light">PASSED DAYS</div>
              <div className="text-3xl font-extrabold">0</div>
            </div>
          </div>
          <div className="flex items-center justify-center pl-0 font-extrabold">
            <Link
              to={`/`}
              className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-500 p-5"
            >
              <div className="">CONTINUE</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeInfo;
