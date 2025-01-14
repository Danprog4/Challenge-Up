import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCardsStore } from "../stores/CardsStore";
import CrossImg from "../assets/images/Krestiksvgpng.ru_.svg";
import Modal from "@/components/Modal";

const Create: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories } = useCardsStore();
  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id)),
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  return (
    <div className="flex h-screen flex-col">
      <div className={`${category?.color} h-[18%]`}>
        <div className="relative mb-2 mt-5 flex w-full">
          <Link to={`/card/${card?.id}`} className="absolute inset-0">
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] w-full text-center text-black">
            New challenge
          </span>
        </div>
        <div className="flex flex-col pl-5 text-start text-black">
          <span className="mb-4 text-sm">Title</span>
          <span className="text-xl font-bold">{card?.title}</span>
        </div>
      </div>
      <div className="flex flex-col pl-5 pt-4 text-start">
        <span className="mb-2 text-gray-300">Terms</span>
      </div>
      <div className="flex items-center justify-center">
        <Modal />
      </div>
    </div>
  );
};

export default Create;
