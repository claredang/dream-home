// Using regular expression to replace all occurrences of '-' with '_'
export function replaceDashesWithUnderscores(inputString: string) {
  return inputString.replace(/-/g, "_");
}

// Capitalize the first letter
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Shuffle the element in an array
export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// eg: farm house -> farm-house
export function convertToHyphen(text: string) {
  const lowercaseText = text.toLowerCase();
  const slugText = lowercaseText.replace(/ /g, "_");
  return slugText;
}

const styleToColorMap: { [key: string]: string } = {
  coastal: "badge-coastal",
  farm_house: "badge-farm-house",
  glam: "badge-glam",
  indochine: "badge-indochine",
  industrial: "badge-industrial",
  midcentury_modern: "badge-midcentury-modern",
  scandinavian: "badge-scandinavian",
};

export function styleToColor(interiorStyle: string) {
  const badgeColorClass =
    styleToColorMap[convertToHyphen(interiorStyle)] || "badge-dark";
  return badgeColorClass;
}

export function replaceUnderscoresWithSpaces(inputString: string) {
  // Use the replace method with a regular expression to replace underscores with spaces
  return inputString.replace(/_/g, " ");
}

export function replaceBlankSpaceWithHyphen(inputString: string) {
  return inputString.replace(/\s/g, "-");
}
