"use client";

import Card from "./Card";
import { useCardData } from "./CardInformation";

function Mision() {
  const dataCard = useCardData();

  return (
    <main>
      <div className="mx-auto mb-16 grid grid-cols-1 px-8 md:grid-cols-3 lg:grid-cols-3">
        {dataCard.map((card, index) => (
          <Card key={index} image={card.image} title={card.title} alt={card.alt} />
        ))}
      </div>
    </main>
  );
}

export default Mision;
