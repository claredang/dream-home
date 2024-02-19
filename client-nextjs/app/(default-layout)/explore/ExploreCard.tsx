import Image from "next/image";

import { MotionDiv } from "../../_components/Motion";

const stagger = 0.25;

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export interface ExploreProp {
  _id: any;
  title: string;
  interior_style: string;
  location: string;
  price: string;
  rating: string;
  image_url: Array<string>;
}

interface Prop {
  explore: ExploreProp;
  index: number;
}

function ExploreCard({ explore, index }: Prop) {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full"
    >
      <div className="relative w-full h-[37vh]">
        <Image
          src={explore.image_url[0]}
          alt={explore.title}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="py-2 flex flex-col gap-1">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-black w-full min-h-[30px]">{explore.title}</h2>
          <Image
            src="./star.svg"
            alt="star"
            width={18}
            height={18}
            className="object-contain"
          />
          <p className="text-basefont-bold">{explore.rating}</p>
        </div>
        <div className="text-gray-50">
          <p>{explore.interior_style}</p>
          <p>{explore.location}</p>
          <p className="text-black">{explore.price}</p>
        </div>
      </div>
    </MotionDiv>
  );
}

export default ExploreCard;
