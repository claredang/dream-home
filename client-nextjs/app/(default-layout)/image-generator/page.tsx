"use client";
import { useState } from "react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [roomType, setRoomType] = useState("");
  const [styles, setStyles] = useState([]);

  const roomTypes = ["Living Room", "Bedroom", "Kitchen"];
  const styleOptions = [
    "Bohemian",
    "Coastal",
    "Farmhouse",
    "Glam",
    "Industrial",
    "Mid-century Modern",
    "Minimalist",
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
    const stylesString = styles.join(", ").toLowerCase();
    const fullPrompt = `Generate the ${roomType.toLowerCase()} in ${stylesString} style(s) that is ${prompt}`;
    console.log("full prompt: ", fullPrompt);
    const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration-user`,
      `http://localhost:8080/api/generate-image`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullPrompt,
        }),
      }
    );
    const data = await response.json();
    setImage(data.image);
  };

  return (
    <div class="gap-1 px-6 flex flex-col md:flex-row flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col w-80">
        <h1 class="text-[#1b140e] tracking-light text-[20px] font-bold leading-tight px-4 pb-3 pt-6">
          What type of room are you designing?
        </h1>
        <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label class="flex flex-col min-w-40 flex-1">
            <p class="text-[#1b140e] text-base font-medium leading-normal pb-2">
              Room Type
            </p>
            <select
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b140e] focus:outline-0 focus:ring-0 border-none bg-[#f3ede7] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#97704e] p-4 text-base font-normal leading-normal"
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
        <h1 class="text-[#1b140e] tracking-light text-[20px] font-bold leading-tight px-4 pb-3 pt-6">
          Which style do you prefer?
        </h1>
        <div class="flex gap-3 p-3 flex-wrap pr-4">
          {styleOptions.map((styleOption) => (
            <div
              key={styleOption}
              class={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 cursor-pointer ${
                styles.includes(styleOption)
                  ? "bg-[#e88630] text-white"
                  : "bg-[#f3ede7] text-[#1b140e]"
              }`}
              onClick={() => handleStyleToggle(styleOption)}
            >
              <p class="text-sm font-medium leading-normal">{styleOption}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label class="flex flex-col min-w-40 flex-1">
              <p class="text-[#1b140e] text-base font-medium leading-normal pb-2">
                Custom Preferences
              </p>
              <textarea
                placeholder="Facing the beach.."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b140e] focus:outline-0 focus:ring-0 border-none bg-[#f3ede7] focus:border-none min-h-36 placeholder:text-[#97704e] p-4 text-base font-normal leading-normal"
              ></textarea>
            </label>
          </div>

          <div class="flex px-4 py-3">
            <button
              type="submit"
              class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e88630] text-[#1b140e] text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span class="truncate">Generate Image</span>
            </button>
          </div>
        </form>
      </div>
      <div class="layout-content-container flex flex-col max-w-[700px] flex-1">
        <div class="flex px-4 py-3">
          {/* <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e88630] text-[#1b140e] text-sm font-bold leading-normal tracking-[0.015em]">
            <span class="truncate">Upload Image</span>
          </button> */}
        </div>
        {image && (
          <div style={{ marginTop: "20px" }}>
            {/* <h2>Generated Image:</h2> */}
            <img src={`data:image/png;base64,${image}`} alt="Generated" />
          </div>
        )}
      </div>
    </div>
  );
}
