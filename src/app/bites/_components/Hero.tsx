"use client";

import { useState } from "react";

export const Hero = (): React.JSX.Element => {
  const [playing, setPlaying] = useState(false);

  const playVideo = () => setPlaying(true);
  const closeModal = () => setPlaying(false);

  return (
    <main
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/bites/background.png)" }}
    >
      <div className="absolute inset-0 bg-pink-400 opacity-70" />
      <div className="hidden h-screen w-screen overflow-hidden md:w-[500px] absolute right-0 xl:block">
        <div className="absolute bottom-0 left-0 h-screen w-screen rounded-full border bg-blue-500 opacity-50" />
      </div>
      <div className="flex h-screen items-center justify-center">
        <img
          className="absolute right-56 rounded-full px-2 md:h-[500px] lg:h-[700px]"
          alt="The specialist Anyi Manchola makes high- detail procedures with delicacy and precision to improve   function and beauty of your teeth  "
          title="The specialist Anyi Manchola makes high- detail procedures with delicacy and precision to improve   function and beauty of your teeth  "
          src="/bites/hero-mask.png"
        />
      </div>
      <div className="absolute right-36 bottom-28 flex size-52 items-center justify-center rounded-full bg-pink-600 md:right-[600px] md:bottom-36 lg:right-[750px]">
        <div className="flex size-36 items-center justify-center rounded-full bg-gradient-to-l from-pink-600 via-pink-400 to-blue-400">
          <img
            onClick={playVideo}
            className="transform cursor-pointer transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
            src="/bites/icons/play.svg"
            alt="Play video"
          />
        </div>
      </div>
      {playing && (
        <div
          className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/948822167?h=b161f955c9"
            width="640"
            height="360"
          />
        </div>
      )}
    </main>
  );
};

export default Hero;
