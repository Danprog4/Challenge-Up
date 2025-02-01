import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCardsStore } from "../stores/CardsStore";
import CrossImg from "../assets/images/—Pngtree—vector cross icon_4254623.png";

const Challenge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories } = useCardsStore();
  const category = categories.find((category) =>
    category.items.some((item) => item.id === Number(id)),
  );
  const card = categories
    .flatMap((category) => category.items)
    .find((item) => item.id === Number(id));

  return (
    <div className="mb-20 flex w-full flex-col">
      <div className="relative">
        <img
          src={card?.imageUrl}
          alt={card?.title}
          className={`h-[450px] ${category?.color} rounded-b-3xl`}
        />
        <Link to={"/new"} className="fixed right-0 top-0 z-10 pr-[16px] pt-6">
          <img
            src={CrossImg}
            alt="cross"
            className="h-[35px] w-[35px] rounded-full"
          />
        </Link>
        <div className="absolute inset-0 flex flex-col pl-[14px] pt-10 text-start">
          <span className="text-sm text-black">Задание</span>
          <span className="text-2xl font-bold text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
            {card?.title}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 flex pb-4 pl-[14px]">
          {card?.duration?.map((dur) => (
            <div className="flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-black bg-cover">
              <div className="text-center">
                <div className="text-[20px] font-extrabold">{dur}</div>
                <div className="mb-1 mt-[-5px] text-[10px] font-light">
                  ДНЕЙ
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 right-0 p-2">
          <div className="m-2 flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full bg-black bg-cover">
            <div className="text-start text-[10px] font-light">
              КАЖДЫЙ <br></br> ДЕНЬ
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="mb-7 mt-4 text-start text-lg text-gray-300">
          {card?.desc}
        </p>
        <div className="text-start">
          <span className="text-2xl font-bold">СОВЕТЫ И ПОДСКАЗКИ</span>
          {card?.hints?.map((hint) => (
            <div className="mt-3 flex gap-2 text-lg font-light text-gray-300">
              <span className="inline-block font-bold text-white">-</span>
              <p>{hint}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center pl-0 font-extrabold">
        <Link
          to={`/card/${card?.id}/create`}
          className="fixed bottom-[10px] flex h-[45px] w-[95vw] items-center justify-center rounded-lg bg-pink-600 p-5"
        >
          <div className="">ПРОДОЛЖИТЬ</div>
        </Link>
      </div>
    </div>
  );
};

export default Challenge;
