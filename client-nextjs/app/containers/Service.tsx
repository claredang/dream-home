import Button from "../_components/Button";
import { SERVICE_LINKS } from "@/app/constants";
import Link from "next/link";

const Service = () => {
  return (
    <section className="2xl:max-container flexCenter flex-col bg-beige-50 lg:h-[500px] pb-10 lg:mb-10 lg:pb-10 xl:mb-10">
      <div className="flex bold-20 pt-5">Welcome to Dream Home</div>
      <div className="flex flex-col sm:flex-row sm:gap-2 md:gap-3 lg:gap-8 sm:m-2 sm:p-3 md:m-3 md:p-3 lg:m-6 lg:p-6">
        {SERVICE_LINKS.map((columns, index) => (
          <div key={index} className="lg:m-6 lg:p-6 align-baseline">
            <ul className="min-h-full regular-14 flex flex-col gap-4 text-black m-4">
              <p className="flex-1 marker:py-3 my-3 bold-20">{columns.title}</p>
              <p className="lg:pb-4 lg:mt-4 lg:mb-5">{columns.description}</p>
              <div className="lg:w-3/4 w-1/2">
                <Button
                  type="link"
                  title={columns.button}
                  variant="btn_black"
                  link={columns.href}
                  full={false}
                />
              </div>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
