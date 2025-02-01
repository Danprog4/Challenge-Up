import React, { useRef, useState } from "react";
import { useCardsStore } from "../stores/CardsStore";
import { Link } from "react-router-dom";

const Slider: React.FC = () => {
  const { categories } = useCardsStore();
  const [currentSlide, setCurrentSlide] = useState<{ [key: number]: number }>(
    {},
  );
  const sliderRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Функция для обновления индекса активного слайда
  const handleScroll = (categoryIndex: number) => {
    const slider = sliderRefs.current[categoryIndex];
    if (!slider) return;

    const scrollLeft = slider.scrollLeft; // Текущая прокрутка
    const cardWidth = 250 + 16; // Ширина карточки + отступ (если есть)
    const newIndex = Math.round(scrollLeft / cardWidth) + 1;

    setCurrentSlide((prev) => ({
      ...prev,
      [categoryIndex]: newIndex,
    }));
  };

  return (
    <div className="flex flex-col">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 pl-5">
          <div className="flex justify-between pr-5">
            <div className="mb-4">{category.title}</div>
            <div className="text-gray-400">
              {currentSlide[categoryIndex] || 1}/{category.items.length}
            </div>
          </div>

          <div
            ref={(el) => (sliderRefs.current[categoryIndex] = el)}
            onScroll={() => handleScroll(categoryIndex)}
            className="flex snap-x snap-mandatory space-x-4 overflow-auto scroll-smooth"
          >
            {category.items.map((card, cardIndex) => (
              <Link
                to={`/card/${card.id}`}
                key={cardIndex}
                className={`relative flex-shrink-0 bg-cover ${category.color} rounded-lg`}
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="-z-50 h-[250px] w-[250px] object-contain"
                />

                <div className="text-outline absolute inset-0 p-3 text-start text-[24px] font-bold leading-7 text-black [text-shadow:_2px_2px_0_rgb(255_255_255),_-2px_-2px_0_rgb(255_255_255),_2px_-2px_0_rgb(255_255_255),_-2px_2px_0_rgb(255_255_255)]">
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
