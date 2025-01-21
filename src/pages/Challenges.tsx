import React, { useState } from "react";
import Slider from "../components/Slider";
import BackImg from "../assets/images/Back.png";
import { Link, useNavigate } from "react-router-dom";
import CrossImg from "../assets/images/Krestiksvgpng.ru_.svg";

const Challenges: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-start p-[15px]">
      <Link to={"/"}>
        <img
          src={BackImg}
          alt="Back"
          className="mb-[-15px] ml-[-7px] mt-[-22px] h-[63px] w-[55px]"
        />
      </Link>
      <div className="flex flex-col">
        <h1 className="mb-2 mt-2 text-4xl font-extrabold">NEW CHALLENGE</h1>
        <p className="mb-8 text-start text-sm text-gray-400">
          Choose a one of 10 ready challenges <br></br> or create yours
        </p>
      </div>
      <Slider />
      <Link
        to={"/card/create"}
        className="flex w-full items-center justify-center pl-0 font-extrabold"
      >
        <div className="fixed bottom-[10px] z-20 flex h-[45px] w-[95vw] items-center justify-between rounded-lg bg-yellow-300 p-5">
          <img src={CrossImg} alt="cross" className="ml-[-18px] h-10 w-10" />
          <span className="text-sm text-black">CREATE YOUR OWN CHALLENGE</span>
        </div>
      </Link>
    </div>
  );
};

export default Challenges;
