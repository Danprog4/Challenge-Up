import React, { useState } from "react";
import Slider from "../components/Slider";
import BackImg from "../assets/images/back-svgrepo-com (2).svg";
import { Link, useNavigate } from "react-router-dom";
import PlusImg from "../assets/images/plus-svgrepo-com.svg";

const Challenges: React.FC = () => {
  return (
    <div className="relative flex flex-col items-start">
      <div className="fixed z-10 flex w-[100vw] justify-between bg-black pb-2 pl-[16px] pr-5 pt-10">
        <Link to={"/"} className="">
          <img
            src={BackImg}
            className="h-[30px] w-[30px] object-contain"
            alt="About"
          />
        </Link>
      </div>

      <div className="mt-20 flex flex-col px-5">
        <h1 className="mb-3 mt-2 text-4xl font-extrabold">НОВОЕ ЗАДАНИЕ</h1>
        <p className="mb-8 text-start text-sm text-gray-400">
          Выбери одно из десяти заданий <br></br> или создай свое
        </p>
      </div>
      <Slider />
      <Link
        to={"/card/create"}
        className="flex w-full items-center justify-center pl-0 font-extrabold"
      >
        <div className="fixed bottom-[10px] z-20 flex h-[45px] w-[90vw] items-center justify-between rounded-lg bg-yellow-300 p-5">
          <Link to={"/card/create"}>
            <img
              src={PlusImg}
              alt="Add"
              className="h-[30px] w-[30px] -translate-x-2"
            />
          </Link>
          <span className="text-sm text-black">СОЗДАЙ НОВОЕ ЗАДАНИЕ</span>
        </div>
      </Link>
    </div>
  );
};

export default Challenges;
