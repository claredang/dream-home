import { fetchExploreImage } from "../action";

import LoadMore from "../_components/LoadMore";

export default async function Explore() {
  const data = await fetchExploreImage(1);
  return (
    <>
      <main className="sm:p-16 xs:p-10 px-8 flex flex-col gap-10 items-center">
        <h2 className="text-3xl text-black font-bold">
          Explore All Interior Design
        </h2>
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {data}
        </section>
        <LoadMore />
      </main>
    </>
  );
}
