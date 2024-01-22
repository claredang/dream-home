import { ShowcaseCard } from "./ShowcaseCard";

const Showcase = () => {
  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <ShowcaseCard
          backgroundImage="bg-home-cover-1"
          title="Farm House"
          subtitle="Prigen, Pasuruan"
          hasContent={true}
        />
        <ShowcaseCard
          backgroundImage="bg-home-cover-2"
          title="Industrial Style"
          subtitle="Spain"
          hasContent={true}
        />
      </div>
    </section>
  );
};

export default Showcase;
