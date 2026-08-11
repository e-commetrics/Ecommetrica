"use client";

interface CardProps {
  image: string;
  title: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ image, title, alt }) => {
  return (
    <main>
      <div className="relative z-10 m-2 flex h-96 flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md shadow-pink-300">
        <img src={image} alt={alt} title={alt} className="relative z-10 size-28 rounded-full bg-pink-500" />
        <h2 className="z-10 my-4 text-center font-poppins text-3xl font-normal text-black">{title}</h2>
        <p className="z-10 my-4 mt-3 text-center font-poppins text-xl font-normal text-neutral-400" />
      </div>
      <img
        src="/bites/elipse.svg"
        className="absolute z-0 hidden translate-x-20 translate-y-[-70px] md:block lg:translate-x-52"
        alt="poligono"
      />
    </main>
  );
};

export default Card;
