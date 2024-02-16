"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "../login/form";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  return (
    <>
      {/* {modal && ( */}
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur-none flex justify-center items-center">
        <div className="bg-white rounded-lg flex flex-col lg:flex-row relative">
          <div className="w-full lg:w-1/2 relative">
            <Image
              src="/house-2.jpg"
              alt="house"
              height={600}
              width={600}
              className="w-full h-full"
            />
          </div>
          <div className="w-full lg:w-1/2 px-10 py-12 flex flex-col justify-between">
            <p className="regular-18 text-gray-50 pb-4">
              Join Dream Home to save your inspiration!
            </p>
            <LoginForm />
            <Link href={pathname}>
              <button
                type="button"
                className="bg-slate-100 rounded-full p-2 absolute top-0 right-0 m-2 hover:shadow-md"
              >
                <IoMdClose />
              </button>
            </Link>
          </div>
        </div>
      </dialog>
      {/* )} */}
    </>
  );
}

export default Modal;
