import React from "react";
import Slider from "../components/Slider";
import BackImg from "../assets/images/Back.png";
import { Link } from "react-router-dom";

const Challenges: React.FC = () => {
  return (
    <div className="flex flex-col items-start p-[15px]">
      <Link to={"/"}>
        <img
          src={BackImg}
          alt="Back"
          className="mb-[-15px] ml-[-7px] mt-[-22px] h-[63px] w-[55px]"
        />
      </Link>
      <div className="flex flex-col">
        <h1 className="mb-2 text-3xl font-bold">NEW CHALLENGE</h1>
        <p className="mb-7 text-start text-xs text-gray-400">
          Choose a one of 10 ready challenges <br></br> or create yours
        </p>
      </div>
      <Slider />
    </div>
  );
};

export default Challenges;
