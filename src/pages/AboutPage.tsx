import React from "react";
import GitHubLogo from "../assets/images/GitHub-Logo.wine.svg";
import TelegramLogo from "../assets/images/Telegram_(software)-X-Black-Logo.wine.svg";
import CopyRightLogo from "../assets/images/5a369c1a2cfcd0.4577110515135283461843.png";
import CrossImg from "../assets/images/—Pngtree—vector cross icon_4254623.png";

import { Link } from "react-router-dom";
import { toast } from "sonner";

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed flex w-full items-center justify-start bg-black pl-[13px] pt-8">
        <Link to={"/"}>
          <img src={CrossImg} alt="Close" className="h-[35px] w-[35px]" />
        </Link>
      </header>
      <Link
        to={"/hints"}
        className="mt-28 flex h-[33vh] w-[100vw] items-center justify-center rounded-full bg-yellow-400"
      >
        <span className="text-center text-2xl font-extrabold text-black">
          СОВЕТЫ <br></br>И ПОДСКАЗКИ
        </span>
      </Link>
      <div className="flex h-[30vw] items-center justify-center rounded-3xl bg-white">
        <span className="text-2xl font-extrabold text-black">
          ПРИОБРЕСТИ ПОДПИСКУ
        </span>
      </div>
      <div className="flex">
        <a
          className="flex h-[50vw] w-[50vw] flex-col items-center justify-center rounded-3xl bg-blue-300"
          href="https://github.com/Danprog4/Challenge-Up"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-[55px] w-[55px]" src={GitHubLogo} alt="GitHub" />
          <span className="font-bold text-black">Danprog4</span>
        </a>
        <a
          className="flex h-[50vw] w-[50vw] flex-col items-center justify-center rounded-3xl bg-red-400"
          href="https://t.me/danikpavlovski"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-[55px] w-[55px]" src={TelegramLogo} alt="GitHub" />
          <span className="font-bold text-black">@danikpavlovski</span>
        </a>
      </div>
      <div
        onClick={() =>
          toast("К сожалению, сейчас доступен только русский язык")
        }
        className="mb-10 flex h-[8vh] w-[100vw] items-center justify-center rounded-full bg-green-600 text-xl font-extrabold text-black"
      >
        <span>ЯЗЫК</span>
      </div>
      <footer className="mb-10 mr-5 mt-auto flex justify-between pl-5">
        <div className="text-2xl font-bold">TaskMaster</div>
        <div className="flex flex-col items-end font-thin">
          <img
            src={CopyRightLogo}
            alt="CopyRight"
            className="h-[25px] w-[25px]"
          />
          <span>2025</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
