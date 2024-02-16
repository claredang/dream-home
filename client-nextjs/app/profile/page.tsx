import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/auth";
import Navbar from "../_components/Navbar";
import { useState, useEffect } from "react";
import Save from "./getsave";
import Link from "next/link";
import { Suspense } from "react";
import Modal from "@/app/_components/Modal";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Dropdown from "../_components/Dropdown";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  //   const { data: session } = useSession();
  //   const user = session?.user;
  //   const [imageUrls, setImageUrls] = useState([]);

  //   useEffect(() => {
  //     // Fetch data when component mounts
  //     getSave();
  //   }, []);

  const getSave = async () => {
    console.log("insude here", user);
    try {
      console.log("insude here");
      // Your server endpoint where you want to send the data
      const endpoint = `http://localhost:8080/design-inspiration`;

      // Assuming your server expects a POST request with a JSON payload
      const response = await fetch(
        `http://localhost:8080/design-inspiration-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "kwonbetty@gmail.com",
          }),
        }
      );
      const data = await response.json();
      //   setImageUrls(data);

      //   // Handle the server response as needed
      //   console.log("Server response:", imageUrls);
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <section className="">
        {/* <Navbar /> */}
        <div className="">
          <div>
            {!user ? (
              <div>
                <p>Get Inspired!</p>
                <p>Save inspiration and products. </p>
                <button>Login</button>
                <Link href="/login">
                  {/* <button type="button" className="bg-blue-500 text-white p-2"> */}
                  Login
                  {/* </button> */}
                </Link>
                {/* <Suspense fallback={<>Loading...</>}>
                  <Modal />
                </Suspense> */}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row lg:py-10 lg:px-12 ">
                {/* <div className="lg:w-1/2 xs:w-full flex-col items-center justify-between p-6 ml-5 bg-yellow-100">
                  <div className="relative h-[400px]">
                    <Image
                      src={`/house-3.jpg`}
                      alt="bg-cover"
                      fill
                      className="rounded-xl"
                    />
                  </div>
                </div> */}
                {/* <p>hello there</p> */}

                <div className="w-full sm:w-1/2">
                  <Save email={user} />
                </div>

                {/* <div>
                  <img
                    src={user.image ? user.image : "/images/default.png"}
                    className="max-h-36"
                    alt={`profile photo of ${user.name}`}
                  />
                </div>
               */}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
