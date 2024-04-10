import axios from "axios";

async function getInspirationGallery({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/style?limit=20&offset=${pageParam}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  let filtered = await data.results.map((style: {}, index: number) => {
    let paddedIndex =
      pageParam === 0
        ? ("00" + (index + 1)).slice(-3)
        : ("00" + (index + 1 + pageParam)).slice(-3);

    const image = `https://assets.style.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    return {
      ...style,
      //   imageUrl: image,
    };
  });
  return filtered;
}
