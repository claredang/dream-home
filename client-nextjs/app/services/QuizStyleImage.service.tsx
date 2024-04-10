import axios from "axios";

export async function getQuizStyleGallery({
  pageParam,
}: {
  pageParam: number;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/style`,
      //   `http://localhost:8080/api/style`,
      {
        params: {
          limit: 20,
          offset: pageParam,
        },
      }
    );

    const data = response.data;
    console.log("data: ", data);

    const filtered = data.results.map((style: any, index: number) => {
      const paddedIndex =
        pageParam === 0
          ? ("00" + (index + 1)).slice(-3)
          : ("00" + (index + 1 + pageParam)).slice(-3);

      const imageUrl = `https://assets.style.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;

      return {
        ...style,
        imageUrl,
      };
    });

    console.log("data: ", filtered);

    return filtered;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
}
