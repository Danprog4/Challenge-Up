import React from "react";
import BackImg from "../assets/images/back-svgrepo-com (2).svg";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HintsAndTipsPage: React.FC = () => {
  const accordionData = [
    {
      id: "item-1",
      question:
        "Держать дисциплину помогает четкий план и осознание своих целей. Разбей задачу на небольшие шаги, чтобы она не казалась сложной. Важнее делать хоть что-то каждый день, чем работать идеально, но редко. Отслеживай прогресс — отмечай выполненные дни, чтобы видеть результаты. Если пропустил день, не вини себя, а просто продолжай. В этом всем тебе поможет наше приложение",
      answer: "Как не бросить начатое и держать дисциплину?",
    },
    {
      id: "item-2",
      question:
        "Прокрастинация часто связана со страхом или перегруженностью. Начни с самого простого шага — даже 5 минут работы помогут преодолеть сопротивление. Установи четкие дедлайны и используй правило «двух минут» для быстрых задач. Избавься от отвлекающих факторов и работай в комфортной среде. Напомни себе, что начать — это уже половина успеха.",
      answer: "Как перестать откладывать важные дела?",
    },
    {
      id: "item-3",
      question:
        "Регулярность — это привычка, а не вопрос мотивации. Привяжи выполнение задач к уже существующим действиям, например, после кофе или перед сном. Создай систему напоминаний или веди трекер привычек. Если пропустил день, не переживай, главное — не пропускать дважды. Делай задания удобными и приятными, чтобы их выполнение не казалось нагрузкой. ",
      answer: "Как выполнять задания регулярно и без срывов?",
    },
  ];

  return (
    <div className="flex h-screen flex-col bg-yellow-400">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-yellow-400 pb-2 pl-[16px] pr-5 pt-9">
        <Link to={"/about"} className="">
          <img
            src={BackImg}
            className="h-[30px] w-[30px] object-contain"
            alt="About"
          />
        </Link>
      </div>

      <div className="mb-14 mt-20 pl-5">
        <span className="text-2xl font-extrabold text-black">
          СОВЕТЫ И ПОДСКАЗКИ
        </span>
      </div>
      <div className="w-[100vw] px-0">
        <Accordion type="single" collapsible className="space-y-1">
          {accordionData.map((item) => (
            <AccordionItem value={`item ${item.id}`} key={item.id}>
              <AccordionTrigger>{item.answer}</AccordionTrigger>
              <AccordionContent>{item.question}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default HintsAndTipsPage;
