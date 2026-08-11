"use client";

import { Servicioshigienistas } from "./TaskInformation";
import { Serviciosesteticos } from "./Task2";
import { useTranslation } from "./i18n";

const Task: React.FC = () => {
  const task = Servicioshigienistas();
  const task2 = Serviciosesteticos();

  const { t } = useTranslation();
  return (
    <main className="mx-auto py-6 md:w-[90%] md:py-12">
      <div className="grid grid-cols-1 gap-4 px-16 md:grid-cols-2">
        <div className="border border-blue-400">
          <div className="flex h-32 items-center justify-center border border-blue-400 bg-[#6BBAE9] px-16 text-white">
            <h2 className="text-center font-poorstory text-4xl">{t("higienicos")}</h2>
            <img src="/bites/icons/poligon-1.svg" className="absolute translate-y-[85px] transform" alt="" />
          </div>
          {task.map((item, index) => (
            <div
              key={index}
              className="mt-7 flex flex-col items-start justify-start gap-12 px-4 py-4 pb-4 md:flex-row md:items-center md:justify-center"
            >
              <img src={item.image} className="w-16" alt={item.alt} title={item.alt} />

              <div className="flex flex-col pb-4">
                <a href={item.link} className="font-poorstory text-xl text-black hover:text-blue-500 hover:underline">
                  <h3>{item.title}</h3>
                </a>
                <h4 className="font-poppins text-base text-gray-500">{item.paragraph}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="border border-[#FE81BD]">
          <div className="flex h-32 items-center justify-center bg-[#FE81BD] px-16 text-white">
            <h2 className="text-center font-poorstory text-4xl">{t("esteticos")}</h2>
            <img src="/bites/icons/poligon-2.svg" className="absolute translate-y-[85px] transform" alt="" />
          </div>
          {task2.map((item, index) => (
            <div
              key={index}
              className="mt-7 flex flex-col items-start justify-start gap-8 px-4 py-4 pb-4 md:flex-row md:items-center md:justify-center"
            >
              <img src={item.image} className="w-16" alt={item.alt} title={item.alt} />
              <div className="flex flex-col pb-4">
                <a href={item.link} className="font-poorstory text-2xl text-black hover:text-pink-500 hover:underline">
                  <h3>{item.title}</h3>
                </a>
                <h4 className="font-poppins text-base text-gray-500">{item.paragraph}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Task;
