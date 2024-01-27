import React from "react";
import Image from "next/image";

interface PokemonProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

const Pokemon: React.FC<PokemonProps> = ({ name, image, innerRef }) => {
  return (
    <React.Fragment>
      <div className="" ref={innerRef}>
        <div className="flex flex-row cursor-pointer shadow-lg bg-white border-r-4  gap-4 items-center p-2 rounded">
          <div className="rounded-full w-[4.5rem] h-[4.5rem]">
            <Image
              src={image}
              alt="profileImg"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <span>{name}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pokemon;
