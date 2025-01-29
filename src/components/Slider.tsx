import React from "react";
import { useCardsStore } from "../stores/CardsStore";
import { Link } from "react-router-dom";

const Slider: React.FC = () => {
  const { categories } = useCardsStore();

  return (
    <div className="flex flex-col">
      {categories.map((category, index) => (
        <div key={index} className="mb-8 pl-5">
          <div className="flex justify-between pr-5">
            <div className="mb-4">{category.title}</div>
            <div className="text-gray-400">1/{category.items.length}</div>
          </div>
          <div className="flex snap-x snap-mandatory space-x-4 overflow-auto scroll-smooth">
            {category.items.map((card, index) => (
              <Link
                to={`/card/${card.id}`}
                key={index}
                className={`relative flex-shrink-0 bg-cover ${category.color} rounded-lg`}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="h-[250px] w-[250px] object-contain"
                />
                <div className="absolute inset-0 z-10 p-3 text-start text-[24px] font-bold leading-7 text-black">
                  {card.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
