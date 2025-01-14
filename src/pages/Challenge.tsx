import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCardsStore } from "../stores/CardsStore";
import CrossImg from "../assets/images/Krestiksvgpng.ru_.svg";

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
    <div className="flex flex-col">
      <div className="relative">
        <img
          src={card?.imageUrl}
          alt={card?.title}
          className={`h-[450px] ${category?.color} rounded-b-3xl`}
        />
        <Link to={"/"} className="absolute right-0 top-0 z-10 m-2 h-8 w-8">
          <img
            src={CrossImg}
            alt="cross"
            className="rounded-full bg-white opacity-50"
          />
        </Link>
        <div className="absolute inset-0 flex flex-col pl-2 pt-7 text-start">
          <span className="text-sm text-white">Challenge</span>
          <span className="text-2xl font-bold text-black">{card?.title}</span>
        </div>
        <div className="absolute bottom-0 left-0 flex p-2">
          {card?.duration?.map((dur) => (
            <div className="m-2 flex h-[55px] w-[55px] flex-col items-center justify-center rounded-full bg-black bg-cover">
              <div className="text-center">
                <div className="font-extrabold">{dur}</div>
                <div className="mt-[-5px] text-[10px] font-light">DAYS</div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 right-0 p-2">
          <div className="m-2 flex h-[55px] w-[55px] flex-col items-center justify-center rounded-full bg-black bg-cover">
            <div className="text-start text-[10px] font-light">
              EVERY <br></br> DAY
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="mb-7 mt-4 text-start text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur ernatur molestias tempore.
          Rerum odio nam debitis. Aspernatur nam magni qui quas totam esse at
          tempore veniam sit?
        </p>
        <div className="text-start">
          <span className="text-xl font-bold">HINTS AND TIPS</span>
          <div className="mt-3 flex gap-2 text-sm font-light text-gray-400">
            <span className="inline-block font-bold text-white">-</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
              eum.
            </p>
          </div>
          <div className="mt-3 flex gap-2 text-sm font-light text-gray-400">
            <span className="inline-block font-bold text-white">-</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
              eum.
            </p>
          </div>
          <div className="mt-3 flex gap-2 text-sm font-light text-gray-400">
            <span className="inline-block font-bold text-white">-</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
              eum.
            </p>
          </div>
          <div className="mt-3 flex gap-2 text-sm font-light text-gray-400">
            <span className="inline-block font-bold text-white">-</span>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi,
              eum.
            </p>
          </div>
        </div>
      </div>
      <Link
        to={`/card/${card?.id}/create`}
        className="sticky bottom-0 flex h-[20px] items-center justify-center rounded-lg bg-pink-600 p-5"
      >
        <div className="">CONTINUE</div>
      </Link>
    </div>
  );
};

export default Challenge;
