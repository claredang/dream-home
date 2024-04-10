import axios from "axios";

export async function getInspirationGallery({
  pageParam,
}: {
  pageParam: number;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER}/api/style`,
      {
        params: {
          limit: 20,
          offset: pageParam,
        },
      }
    );

    const data = response.data;

    let filtered = data.results.map((style: any, index: number) => {
      let paddedIndex =
        pageParam === 0
          ? ("00" + (index + 1)).slice(-3)
          : ("00" + (index + 1 + pageParam)).slice(-3);

      const image = `https://assets.style.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return {
        ...style,
        imageUrl: image,
      };
    });

    return filtered;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
