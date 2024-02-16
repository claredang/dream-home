// import Header from "@/components/header.component";
import { LoginForm } from "./form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      {/* <Header /> */}
      <section className="flex-row">
        <div className="flexCenter lg:max-container relative w-full min-h-screen">
          <div className="hide-scrollbar flex w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
            <Image
              src="/house-2.jpg"
              alt="Home Cover"
              fill
              className="h-full w-full min-w-[1100px] bg-home-cover-1 bg-cover bg-no-repeat"
            />
          </div>
          <div className="absolute container mx-auto px-6 py-12 h-full flex justify-center items-center">
            <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 rounded-3xl ">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
