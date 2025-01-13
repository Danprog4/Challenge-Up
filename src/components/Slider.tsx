import React from "react";
import { useCardsStore } from "../stores/CardsStore";
import { Link } from "react-router-dom";

const Slider: React.FC = () => {
  const { categories } = useCardsStore();

  return (
    <div className="flex flex-col">
      {categories.map((category, index) => (
        <div key={index} className="mb-5">
          <div className="flex justify-between">
            <div className="mb-3">{category.title}</div>
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
                  className="h-[210px] w-[210px] object-contain"
                />
                <div className="absolute inset-0 p-1 text-start font-bold text-black">
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
