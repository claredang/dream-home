import { getServerSession } from "next-auth";
import { authOptions } from "../../app/lib/auth";
import Navbar from "../_components/Navbar";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const getSave = () => {
    // try {
    //   console.log("insude here");
    //   // Your server endpoint where you want to send the data
    //   const endpoint = `http://localhost:8080/design-inspiration`;
    //   // Assuming your server expects a POST request with a JSON payload
    //   const response = await fetch(`http://localhost:8080/design-inspiration`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: "kwonbetty@gmail.com",
    //     }),
    //   });
    //   const data = await response.json();
    //   // Handle the server response as needed
    //   console.log("Server response:", data);
    // } catch (error) {
    //   // Handle errors
    //   console.error("Error submitting data:", error);
    // }
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
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
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
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
