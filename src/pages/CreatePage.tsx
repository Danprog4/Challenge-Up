import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCardsStore } from "../stores/CardsStore";
import { useTasksStore } from "@/stores/TasksStore";
import CrossImg from "../assets/images/Krestiksvgpng.ru_.svg";
import Modal from "@/components/RegularityModal";
import DurModal from "@/components/DurationModal";
import StartModal from "@/components/StartModal";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Colors } from "@/bgColors";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Create: React.FC = () => {
  interface Days {
    date: string;
    dayCount: number;
    userCheckedDays: string[];
  }

  const navigate = useNavigate();
  const { addTask } = useTasksStore();
  const { id } = useParams<{ id: string }>();
  const { categories } = useCardsStore();

  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id)),
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  const [isFocus, setIsFocus] = useState(false);
  const [title, setTitle] = useState(card?.title || "CHALLENGE NAME");
  const [isNotifications, setIsNotifications] = useState(false);
  const [notifications, setNotifications] = useState("Motivate yourself");
  const [color, setColor] = useState(category?.color || "bg-pink-200");
  const [duration, setDuration] = useState(30);
  const [regularity, setRegularity] = useState("Everyday");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);

  const handleClick = () => {
    if (notifications === "Motivate yourself") {
      setNotifications("");
    }
  };

  const handleChange = (event: React.FormEvent<HTMLDivElement>) => {
    const newNotifications =
      (event.target as HTMLDivElement).textContent || "Motivate yourself";
    setNotifications(newNotifications);
  };

  const getNavigationPath = () => (card ? `/card/${card.id}` : "/");

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`;
  };

  const getDatesForDaysOfWeek = (
    startDate: Date,
    duration: number,
    selectedDays: number[],
  ) => {
    const taskDays: Days[] = [];
    let currentDate = dayjs(startDate);
    let dayCount = 1;

    for (let i = 0; i < duration; i++) {
      if (selectedDays.includes(currentDate.day())) {
        taskDays.push({
          date: currentDate.format("YYYY-MM-DD"),
          dayCount,
          userCheckedDays: [],
        });
        dayCount++;
      }
      currentDate = currentDate.add(1, "day");
    }
    return taskDays;
  };

  const handleSave = () => {
    if (!title || title === "CHALLENGE NAME") {
      alert("Write a title of your task");
      return;
    }

    const startDate = new Date(date ? date : Date.now());

    if (formatDate(startDate) < formatDate(new Date(Date.now()))) {
      alert("Write a possible start time");
      return;
    }

    const taskDays = getDatesForDaysOfWeek(startDate, duration, daysOfWeek);

    const taskData = {
      id: crypto.randomUUID(),
      title,
      color,
      notifications: isNotifications,
      notificationText: notifications,
      duration,
      regularity,
      date,
      daysOfWeek,
      taskDays: taskDays,
      userCheckedDays: [],
    };

    addTask(taskData);
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col">
      <div className={`${color} h-[23%]`}>
        <div className="relative mb-2 mt-5 flex w-full">
          <Link to={getNavigationPath()} className="absolute inset-0">
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] w-full text-center text-black">
            New challenge
          </span>
        </div>
        <div className="flex flex-col pl-5 text-start text-black">
          <div className="mr-[5%] mt-4 flex justify-between text-sm">
            <span>Title</span>
            {isFocus && title !== "CHALLENGE NAME" && (
              <span>{title.length}/28</span>
            )}
          </div>

          <div
            className={cn(
              "mr-[5%] mt-3 text-2xl font-extrabold uppercase",
              title === "CHALLENGE NAME" && "opacity-[0.3]",
            )}
            contentEditable={true}
            onInput={(event) => {
              const inputText =
                (event.target as HTMLElement).textContent?.toUpperCase() || "";

              if (inputText.length > 28) {
                (event.target as HTMLElement).textContent = String(
                  inputText.substring(0, 28),
                );
              } else {
                setTitle(inputText);
              }
            }}
            onFocus={() => {
              setIsFocus(true);
              if (title === "CHALLENGE NAME") {
                setTitle("");
              }
            }}
          >
            {title}
          </div>
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
        <DurModal duration={duration} setDuration={setDuration} id={id} />
        <StartModal date={date} setDate={setDate} />
      </div>
      <div className="mt-4 flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Notifications</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex h-[44px] w-[90vw] items-center justify-between rounded-md bg-gray-700 p-[10px]">
          <span>Enable notifications</span>
          <Switch onClick={() => setIsNotifications(!isNotifications)} />
        </div>
        {isNotifications && (
          <div className="flex h-[60px] w-[90vw] flex-col justify-center rounded-md bg-gray-700 p-[10px]">
            <span>Notification text</span>
            <div
              className="text-gray-500"
              contentEditable="true"
              onClick={handleClick}
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

export default Create;
