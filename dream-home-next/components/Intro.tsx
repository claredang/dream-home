import { PEOPLE_URL } from "@/constants";
import Image from "next/image";
import { ShowcaseCard } from "./ShowcaseCard";

const Intro = () => {
  return (
    <section className="2xl:max-container relative flex flex-col pb-10 lg:mb-10 lg:pb-0 xl:mb-10">
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <ShowcaseCard backgroundImage="bg-home-cover-1" />
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-slate-50 p-8 lg:max-w-[500px] xl:max-w-[500px] xl:rounded-5xl xl:px-10 xl:py-10 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-black">
            Have you ever wonder what is your <strong>interior style</strong>?
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-black">
            We help you identify your dream home style! Welcome to our website
            where you can discover the perfect home style that suits your taste
            and preferences 🏡✨
          </p>
          <Image
            src="/quote.svg"
            alt="camp-2"
            width={186}
            height={219}
            className="camp-quote"
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;
