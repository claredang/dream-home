import Image from "next/image";
import Link from "next/link";

const QuizService = () => {
  return (
    <section>
      <div>
        <div className="flex flex-col sm:flex-row lg:py-10 lg:px-5">
          <div className="lg:w-2/5 xs:w-full p-6 ml-5 bg-red-200">
            <p className="bold-32 p-3 lg:mb-20 mb-15">
              What is my interior design style?
            </p>
            <p>
              Select the rooms that make you swoon. Decisions are hard. Pick as
              many as you want!
            </p>
            <button className="btn-yellow">
              <Link href="/gallery">Pick Your Style Quiz</Link>
            </button>
          </div>

          <div className="lg:w-3/5 w-full flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2">
              <div className="relative h-[400px]">
                <Image
                  src={`/house-3.jpg`}
                  alt="bg-cover"
                  fill
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-2">
              <div className="relative h-[400px]">
                <Image
                  src={`/house-4.jpg`}
                  alt="bg-cover"
                  fill
                  className="rounded-xl"
                />
              </div>
            </div>
            {/* <div className="lg:w-3/4 w-full p-2">
              <div className="relative h-[400px]">
                <Image
                  src={"/quiz2.gif"}
                  layout={"responsive"}
                  height={600}
                  width={400}
                  alt={`A cute animal!`}
                  unoptimized={true}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row lg:py-10 lg:px-5">
          <div className="lg:w-3/5 w-full flex flex-wrap">
            <div className="w-full p-2">
              <div className="relative h-[400px]">
                <Image src={`/house-2.jpg`} alt="bg-cover" fill />
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 xs:w-full flex-col items-center justify-between p-6 ml-5">
            <p className="bold-32 p-3 lg:mb-20 mb-15 ">
              A home style that you love
            </p>
            <p>
              Not sure whether your style is Bohemian, Glam, or Midcentury
              Modern? Our home decor style quiz helps you uncover your unique
              design style.
            </p>
            <button className="font-bold p-2 rounded-2xl bg-yellow-50 text-blue-100 mr-3">
              <Link href="/quiz-test">Do Quiz Again</Link>
            </button>
            <button className="font-bold p-2 rounded-2xl bg-yellow-50 text-blue-100">
              <Link href="/explore">Explore Style</Link>
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="lg:w-1/2">
            <div className="relative h-[400px]">
              <Image src={`/house-8.jpg`} alt="bg-cover" fill />
            </div>
          </div>
          <div className="lg:w-1/2 w-full bg-slate-100 flexCenter flex-col hidden sm:flex">
            <p className="bold-32">Ready to find your design style?</p>
            <button className="btn-yellow">
              <Link href="/explore">Explore Style</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizService;
