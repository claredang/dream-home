import { ShowcaseCard } from "./ShowcaseCard";
import Masonry from "react-responsive-masonry";

const Showcase = () => {
  const imageUrls = ["./house-1.jpg", "./house-2.jpg", "", "", "", ""];
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
      <div className="max-h-[300px] max-w-[300ppx] bg-yellow-100">
        <Masonry columnsCount={3} gutter="4px">
          {imageUrls.map((image, index) => (
            <div
              key={index}
              style={{
                height: "100px",
                // width: "100px",
                margin: "1px",
              }}
            >
              {/* <img
              src={image}
              alt="he"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            /> */}
              {image ? (
                <img
                  src={image}
                  alt="he"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    backgroundColor: "white",
                  }}
                ></div>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Showcase;
