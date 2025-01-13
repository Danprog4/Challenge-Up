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
    <div className="relative flex flex-col">
      <div className={`${category?.color} flex h-[150px] flex-col`}>
        <div className="flex gap-[68px]">
          <Link to={`/card/${card?.id}`}>
            <img src={CrossImg} alt="cross" className="m-2 h-10 w-10" />
          </Link>
          <span className="mt-[15.5px] text-black">New challenge</span>
        </div>
        <div className="flex flex-col pl-5 text-start text-black">
          <span className="mb-4 text-xs font-light">Title</span>
          <span className="text-xl font-bold">{card?.title}</span>
        </div>
      </div>
      <div className="flex flex-col pl-5 pt-4 text-start">
        <span>Terms</span>
      </div>
      <div className="flex items-center justify-center">
        <Modal />
      </div>
    </div>
  );
};

export default Create;
