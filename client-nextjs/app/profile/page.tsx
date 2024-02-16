import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/auth";
import Navbar from "../_components/Navbar";
import { useState, useEffect } from "react";
import Save from "./getsave";
import Link from "next/link";
import { Suspense } from "react";
import Modal from "@/app/_components/Modal";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
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
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        {/* <Navbar /> */}
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            {!user ? (
              <div>
                <p>Loading...</p>
                <p>Want to save your result? </p>
                <button>Login</button>
                <Link href="?modal=true">
                  <button type="button" className="bg-blue-500 text-white p-2">
                    Open Modal
                  </button>
                </Link>
                <Suspense fallback={<>Loading...</>}>
                  <Modal />
                </Suspense>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <div>
                  <img
                    src={user.image ? user.image : "/images/default.png"}
                    className="max-h-36"
                    alt={`profile photo of ${user.name}`}
                  />
                </div>
                <div className="mt-8">
                  <p className="mb-3">Name: {user.name}</p>
                  {/* <button onClick={getSave}>retrieve</button> */}
                </div>
                <Save email={user} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
