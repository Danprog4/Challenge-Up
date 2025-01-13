import { create } from "zustand";
import VegImg from "../assets/images/vegetarian-food-shopping.svg";
import CleanImg from "../assets/images/cleaning-room.svg";
import AlchoImg from "../assets/images/woman-relaxing-in-bathtub.svg";
import YogaImg from "../assets/images/yoga-class.svg";
import RunImg from "../assets/images/morning-run-with-dog.svg";
import CookImg from "../assets/images/preparing-healthy-meal.svg";
import FriendsImg from "../assets/images/watching-movie-with-friends.svg";
import DogImg from "../assets/images/people-playing-with-dogs.svg";
import GymImg from "../assets/images/first-day-at-gym.svg";
import BoxImg from "../assets/images/couple-doing-boxing-practice.svg";

interface CardsStore {
  categories: Category[];
}

interface Card {
  id: number;
  title: string;
  desc?: string;
  hints?: string[];
  imageUrl: string;
  duration?: number[];
}

interface Category {
  color: string;
  title: string;
  items: Card[];
}

const useCardsStore = create<CardsStore>((set) => ({
  categories: [
    {
      title: "Routine",
      items: [
        {
          id: 1,
          title: "CLEAN YOUR ROOM",
          imageUrl: CleanImg,
          duration: [30, 90],
        },
        { id: 2, title: "GO TO THE GYM", imageUrl: GymImg, duration: [30] },
      ],
      color: "bg-blue-300",
    },
    {
      title: "Health",
      items: [
        {
          id: 3,
          title: "BOX IS FOR EVERYONE",
          imageUrl: BoxImg,
          duration: [15, 30],
        },
        { id: 4, title: "NO ALCOHOL", imageUrl: AlchoImg, duration: [30, 90] },
        {
          id: 5,
          title: "DAILY STRETCHING",
          imageUrl: YogaImg,
          duration: [7, 15, 30],
        },
      ],
      color: "bg-green-300",
    },
    {
      title: "Lifestyle",
      items: [
        { id: 3, title: "RUN EVERY DAY", imageUrl: RunImg, duration: [30] },
        { id: 4, title: "COOKING MARATHON", imageUrl: CookImg, duration: [30] },
      ],
      color: "bg-orange-300",
    },
    {
      title: "Awareness",
      items: [
        { id: 3, title: "BE VEGETARIAN", imageUrl: VegImg, duration: [30, 90] },
        {
          id: 4,
          title: "MEET WITH YOUR FRIENDS",
          imageUrl: FriendsImg,
          duration: [7, 15, 30],
        },
        {
          id: 5,
          title: "PLAY WITH YOUR PET",
          imageUrl: DogImg,
          duration: [30],
        },
      ],
      color: "bg-pink-300",
    },
  ],
}));

export { useCardsStore };
