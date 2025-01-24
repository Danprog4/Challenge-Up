import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTasksStore } from "@/stores/TasksStore";
import CrossImg from "../assets/images/Krestiksvgpng.ru_.svg";
import Modal from "@/components/RegularityModal";
import DurModal from "@/components/DurationModal";
import StartModal from "@/components/StartModal";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Colors } from "@/bgColors";

const UpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { getTaskbyId, updateTask } = useTasksStore();

  useEffect(() => {
    if (!taskId) {
      navigate("/");
      return;
    }
  }, [taskId, navigate]);

  const task = taskId ? getTaskbyId(taskId) : undefined;
  
  useEffect(() => {
    if (!task) {
      navigate("/");
    }
  }, [task, navigate]);

  if (!taskId || !task) return null;

  const [isNotifications, setIsNotifications] = useState(task.notifications);
  const [notifications, setNotifications] = useState(task.notificationText);
  const [color, setColor] = useState(task.color);
  const [duration, setDuration] = useState(task.duration);
  const [regularity, setRegularity] = useState(task.regularity);
  const [date, setDate] = useState<Date | undefined>(task.date);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(task.daysOfWeek);

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const newNotifications =
      (event.target as HTMLDivElement).textContent || "Motivate yourself";
    setNotifications(newNotifications);
  };

  const handleSave = () => {
    if (!taskId) return;

    const taskData = {
      ...task,
      color,
      notifications: isNotifications,
      notificationText: notifications,
      duration,
      regularity,
      date,
      daysOfWeek,
    };

    updateTask(taskId, taskData);
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col">
      <div className={`${color} h-[23%]`}>
        <div className="relative mb-2 mt-5 flex w-full">
          <Link to="/" className="absolute inset-0">
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] w-full text-center text-black">
            New challenge
          </span>
        </div>
        <div className="flex flex-col pl-5 text-start text-black">
          <span className="mt-4 text-sm">Title</span>
          <span className="mt-3 text-2xl font-extrabold">{task.title}</span>
        </div>
      </div>
      <div className="flex flex-col pl-5 pt-5 text-start">
        <span className="mb-2 mt-2 text-gray-300">Terms</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Modal
          regularity={regularity}
          setRegularity={setRegularity}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
        />
        <DurModal duration={duration} setDuration={setDuration}/>
        <StartModal date={date} setDate={setDate} />
      </div>
      <div className="mt-4 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Notifications</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex h-[44px] w-[90vw] items-center justify-between rounded-md bg-gray-700 p-[10px]">
          <span>Enable notifications</span>
          <Switch
            checked={isNotifications}
            onChange={() => setIsNotifications(!isNotifications)}
          />
        </div>
        {isNotifications && (
          <div className="flex h-[60px] w-[90vw] flex-col justify-center rounded-md bg-gray-700 p-[10px]">
            <span>Notification text</span>
            <div
              className="text-gray-500"
              contentEditable="true"
              onInput={handleChange}
            >
              {notifications}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Color scheme</span>
      </div>
      <div className="mb-20 grid grid-cols-5 gap-0">
        {Colors.map((classColor: string) => (
          <div
            key={classColor}
            className={cn(
              `h-[78px] w-[78px] cursor-pointer rounded-full ${classColor}`,
              color === classColor && "border-4 border-white",
            )}
            onClick={() => setColor(classColor)}
          ></div>
        ))}
      </div>
      <div className="flex items-center justify-center pl-0 font-extrabold">
        <button
          onClick={handleSave}
          className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-600 p-5"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default UpdatePage;
