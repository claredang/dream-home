import Image from "next/image";
import Link from "next/link";

const QuizService = () => {
  return (
    <section>
      <div className="text-gray-50">
        <div className="flex flex-col sm:flex-row lg:py-10 lg:px-5 bg-orange-100">
          <div className="lg:w-2/5 xs:w-full flex flex-col justify-around gap-5 p-6 ml-5">
            <p className="bold-32 text-blue-100">
              What is my interior design style?
            </p>
            <p className="pr-6">
              Explore and select as many images as you like that resonate with
              your style preferences. From cozy nooks to sleek interiors, let
              the visuals inspire your design journey.
            </p>
            <p>
              Click on each image that speaks to you and watch your dream space
              come to life!
            </p>
            <button className="btn-yellow lg:w-1/2 sm:w-full">
              <Link href="/quiz-test">Pick Your Styles Quiz</Link>
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
                <Image
                  src={`/home-cover-4.jpg`}
                  alt="bg-cover"
                  fill
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-2/5 xs:w-full flex flex-col justify-around gap-5 p-6 ml-5">
            <p className="bold-32 text-blue-100">
              Identify styles that you love
            </p>
            <p className="pr-6">
              Answer a series of fun questions and explore a myriad of stunning
              images to uncover your unique interior design aesthetic. Let's get
              started!
            </p>
            <button className="btn-yellow lg:w-1/2 sm:w-full">
              <Link href="/quiz-test/quiz-card">Pictures & Words Quiz</Link>
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="lg:w-1/2">
            <div className="relative h-[400px]">
              <Image src={`/home-cover-3.jpg`} alt="bg-cover" fill />
            </div>
          </div>
          <div className="lg:w-1/2 w-full bg-orange-100 flexCenter text-center flex-col hidden sm:flex justify-around gap-5">
            <p className="bold-32 text-blue-100">
              Ready to find your design style?
            </p>
            <button className="btn-yellow">
              <Link href="/quiz-test">Quiz Your Style</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizService;
