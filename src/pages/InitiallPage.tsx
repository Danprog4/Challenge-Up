import React from "react";
import { Link } from "react-router-dom";
import AboutImage from "../assets/images/About.png";
import AddImage from "../assets/images/Add.png";

const InitiallPage: React.FC = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="flex justify-between">
        <Link to={"/"}>
          <img src={AboutImage} className="h-[45px] w-[55px]"></img>
        </Link>
        <Link to={"new"}>
          <img src={AddImage} className="h-[45px] w-[55px]"></img>
        </Link>
      </div>
      <Link to={"new"}>
        <div className="flex justify-center">
          <div className="flex size-[100vw] items-center justify-center rounded-full bg-yellow-400">
            <div className="relative text-center">
              <div className="mb-2 text-4xl font-medium text-black">+</div>
              <div className="mb-11 text-xl font-extrabold text-black">
                CREATE NEW <br></br> CHALLENGE
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="text-nowrap p-2 text-center text-xs text-gray-400">
        <div>
          You don't have any challenges yet. Choose a new <br></br> challenge
          from a list of available challenges or creare a <br></br> completely
          new one!
        </div>
      </div>
    </div>
  );
};

export default InitiallPage;
