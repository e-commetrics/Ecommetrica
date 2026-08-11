"use client";

import { useState } from "react";

interface CardServiceProps {
  date: string;
  comments: string;
  image: string;
  hoverComments: string;
  alt: string;
  url: string;
}

const CardService: React.FC<CardServiceProps> = ({ date, comments, image, hoverComments, alt, url }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-12">
      <div className="rounded-xl border border-gray-200 bg-white shadow md:w-[500px]">
        <div className="cursor-pointer overflow-hidden">
          <a href={url}>
            <img
              className="transform transition duration-500 hover:scale-110 md:h-[300px] md:w-[500px]"
              src={image}
              alt={alt}
              title={alt}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </a>
        </div>

        <div className="p-4">
          <span className="font-roboto text-xs font-light text-indigo-600">{date}</span>
          <ul>
            {!isHovered && <h2 className="font-poorstory text-2xl font-normal text-black">{comments}</h2>}
            {isHovered && <h2 className="font-poorstory text-2xl font-normal text-black">{hoverComments}</h2>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardService;
