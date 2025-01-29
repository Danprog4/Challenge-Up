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
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "item-2",
      question: "How does it work?",
      answer: "It follows the basic principles of accessibility and usability.",
    },
    {
      id: "item-3",
      question: "What about mobile?",
      answer: "It works perfectly on mobile devices with responsive design.",
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
