import { ShowcaseCard } from "./ShowcaseCard";
import Slideshow from "../_components/ImageSlider";

const Intro = () => {
  return (
    <section className="2xl:max-container relative flex flex-col pb-10 lg:mb-10 lg:pb-0 xl:mb-10">
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <Slideshow
          images={[
            "house-1.jpg",
            "house-2.jpg",
            "house-3.jpg",
            "house-4.jpg",
            "house-7.jpg",
            "house-8.jpg",
          ]}
        />
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
        </div>
      </div>
    </section>
  );
};

export default Intro;
