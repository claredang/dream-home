"use client";
import { useState, useEffect } from "react";

function FetchingData(url) {
  console.log("url fetch data: ", url);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("inside here");
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     console.log("data fetch: ", data);
    //     setData(data);
    //   } catch (error) {
    //     console.log("error: ", error);
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchData();

    // Cleanup function (optional)
    return () => {
      // Abort fetch if component unmounts before fetch completes
    };
  }, [url]);

  return { data, loading, error };
}

export default FetchingData;
