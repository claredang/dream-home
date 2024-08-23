"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ImageGenerator() {
  const [customize, setCustomize] = useState("");
  const [image, setImage] = useState("");
  const [roomType, setRoomType] = useState("");
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(false);

  const roomTypes = ["Living Room", "Dining Room", "Bedroom", "Office"];
  const styleOptions = [
    "Bohemian",
    "Coastal",
    "Farmhouse",
    "Glam",
    "Industrial",
    "Mid-century Modern",
    "Indochine",
    "Scandinavian",
  ];

  const handleStyleToggle = (style) => {
    if (styles.includes(style)) {
      setStyles(styles.filter((s) => s !== style));
    } else {
      setStyles([...styles, style]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const stylesString = styles.join(", ").toLowerCase();
    const fullPrompt = `Generate the ${roomType.toLowerCase()} in ${stylesString} style(s) that is ${customize}`;

    // If want to get from server
    // try {
    //   const response = await fetch(
    //     `http://localhost:8080/api/generate-image`,
    //     // `https://54.88.198.192/api/generate-image`,
    //     //   const response = await fetch(
    //     // `${process.env.NEXT_PUBLIC_SERVER}/api/generate-image`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         fullPrompt,
    //       }),
    //     }
    //   );
    //   const data = await response.json();
    //   setImage(data.image);
    // } catch (error) {
    //   console.error("Error fetching image:", error);
    // } finally {
    //   setLoading(false);
    // }

    const prompt = fullPrompt;
    const GETIMG_API_KEY = process.env.GETIMG_API_KEY;
    const url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${GETIMG_API_KEY}`,
      },
      body: JSON.stringify({
        model: "stable-diffusion-xl-v1-0",
        prompt: prompt,
        negative_prompt: "Disfigured, cartoon, blurry",
        prompt_2: prompt,
        negative_prompt_2: "Disfigured, cartoon, blurry",
        width: 768,
        height: 768,
        steps: 30,
        guidance: 7.5,
        seed: 0,
        scheduler: "euler",
        output_format: "jpeg",
        response_format: "b64",
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setImage(data.image);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gap-1 px-5 flex flex-col md:flex-row flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-96">
        <h1 className="text-[#1b140e] tracking-light text-[20px] font-bold leading-tight px-4 pb-3 pt-6">
          What type of room are you designing?
        </h1>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#1b140e] text-base font-medium leading-normal pb-2">
              Room Type
            </p>
            <select
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b140e] focus:outline-0 focus:ring-0 border-none bg-[#f3ede7] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#97704e] p-4 text-base font-normal leading-normal"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a room type
              </option>
              {roomTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <h1 className="text-[#1b140e] tracking-light text-[20px] font-bold leading-tight px-4 pb-3 pt-6">
          Which style do you prefer?
        </h1>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          {styleOptions.map((styleOption) => (
            <div
              key={styleOption}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 cursor-pointer ${
                styles.includes(styleOption)
                  ? "bg-[#e88630] text-white"
                  : "bg-[#f3ede7] text-[#1b140e]"
              }`}
              onClick={() => handleStyleToggle(styleOption)}
            >
              <p className="text-sm font-medium leading-normal">
                {styleOption}
              </p>
            </div>
          ))}
          <button className="btn-yellow">
            <Link href="/quiz-test" target="_blank">
              Quiz Your Style
            </Link>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#1b140e] text-base font-medium leading-normal pb-2">
                Custom Preferences
              </p>
              <textarea
                placeholder="Facing the beach.."
                value={customize}
                onChange={(e) => setCustomize(e.target.value)}
                // required
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b140e] focus:outline-0 focus:ring-0 border-none bg-[#f3ede7] focus:border-none min-h-36 placeholder:text-[#97704e] p-4 text-base font-normal leading-normal"
              ></textarea>
            </label>
          </div>

          <div className="flex px-4 py-3">
            <button
              type="submit"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e88630] text-[#1b140e] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Generate Image</span>
            </button>
          </div>
        </form>
      </div>
      <div className="layout-content-container flex flex-col max-w-[700px] flex-1">
        <div className="flex px-4 py-3">
          {loading && (
            <div className="min-h-screen flex justify-center items-center">
              <div className="relative">
                <Image
                  src="/spinner-square.svg"
                  alt="Home Cover"
                  width={200}
                  height={200}
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
          {!loading && image && (
            <div style={{ marginTop: "20px" }}>
              <img src={`data:image/png;base64,${image}`} alt="Generated" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
