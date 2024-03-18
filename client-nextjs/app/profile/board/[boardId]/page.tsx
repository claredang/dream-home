"use client";
import { useState, useEffect } from "react";
import { getServerSession } from "next-auth";
import { usePathname, useSearchParams } from "next/navigation";
import { authOptions } from "../../../../app/lib/auth";

const BoardId = async () => {
  const session = getServerSession(authOptions);
  const user = session?.user;
  const [collections, setCollections] = useState([]);
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  console.log("search keyword: ", search);
  //   useEffect(() => {
  //     getSave();
  //     console.log("Collections updated:", collections);
  //   }, []);

  //   useEffect(() => {
  //     const url = `${pathname}?${searchParams}`;
  //     console.log(url);
  //     // You can now use the current URL
  //     // ...
  //   }, [pathname, searchParams]);

  const getSave = async () => {
    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration-user`,
        `http://localhost:8080/design-board-images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            board_name: board,
          }),
        }
      );
      const data = await response.json();
      setCollections(data);

      console.log("Server response:", data, collections);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div className="min-h-screen bg-pink-100 flex items-center">
      detail about product
    </div>
  );
};

export default BoardId;
