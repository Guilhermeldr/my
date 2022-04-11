const purpleDark = {
  // purple1: "#1b141d",
  // purple2: "#221527",
  // purple3: "#301a3a",
  // purple4: "#3a1e48",
  // purple5: "#432155",
  // purple6: "#4e2667",
  // purple7: "#5f2d84",
  purple8: "#7938b2",
  purple9: "#8e4ec6",
  purple10: "#9d5bd2",
  purple11: "#bf7af0",
};
const indigoDark = {
  // indigo1: "#131620",
  // indigo2: "#15192d",
  // indigo3: "#192140",
  // indigo4: "#1c274f",
  // indigo5: "#1f2c5c",
  // indigo6: "#22346e",
  // indigo7: "#273e89",
  indigo8: "#2f4eb2",
  indigo9: "#3e63dd",
  indigo10: "#5373e7",
  indigo11: "#849dff",
};

const plumDark = {
  // plum1: "#1d131d",
  // plum2: "#251425",
  // plum3: "#341a34",
  // plum4: "#3e1d40",
  // plum5: "#48214b",
  // plum6: "#542658",
  // plum7: "#692d6f",
  plum8: "#883894",
  plum9: "#ab4aba",
  plum10: "#bd54c6",
  plum11: "#d864d8",
};

const crimsonDark = {
  // crimson1: "#1d1418",
  // crimson2: "#27141c",
  // crimson3: "#3c1827",
  // crimson4: "#481a2d",
  // crimson5: "#541b33",
  // crimson6: "#641d3b",
  // crimson7: "#801d45",
  crimson8: "#ae1955",
  crimson9: "#e93d82",
  crimson10: "#f04f88",
  crimson11: "#f76190",
};

const pinkDark = {
  // pink1: "#1f121b",
  // pink2: "#271421",
  // pink3: "#3a182f",
  // pink4: "#451a37",
  // pink5: "#501b3f",
  // pink6: "#601d48",
  // pink7: "#7a1d5a",
  pink8: "#a71873",
  pink9: "#d6409f",
  pink10: "#e34ba9",
  pink11: "#f65cb6",
};

const violetDark = {
  // violet1: "#17151f",
  // violet2: "#1c172b",
  // violet3: "#251e40",
  // violet4: "#2c2250",
  // violet5: "#32275f",
  // violet6: "#392c72",
  // violet7: "#443592",
  violet8: "#5842c3",
  violet9: "#6e56cf",
  violet10: "#7c66dc",
  violet11: "#9e8cfc",
};

const blueDark = {
  // blue1: "#0f1720",
  // blue2: "#0f1b2d",
  // blue3: "#10243e",
  // blue4: "#102a4c",
  // blue5: "#0f3058",
  // blue6: "#0d3868",
  // blue7: "#0a4481",
  blue8: "#0954a5",
  blue9: "#0091ff",
  blue10: "#369eff",
  blue11: "#52a9ff",
};

const cyanDark = {
  // cyan1: "#07191d",
  // cyan2: "#061e24",
  // cyan3: "#072830",
  // cyan4: "#07303b",
  // cyan5: "#073844",
  // cyan6: "#064150",
  // cyan7: "#045063",
  cyan8: "#00647d",
  cyan9: "#05a2c2",
  cyan10: "#00b1cc",
  cyan11: "#00c2d7",
};

const tealDark = {
  // teal1: "#091915",
  // teal2: "#04201b",
  // teal3: "#062923",
  // teal4: "#07312b",
  // teal5: "#083932",
  // teal6: "#09443c",
  // teal7: "#0b544a",
  teal8: "#0c6d62",
  teal9: "#12a594",
  teal10: "#10b3a3",
  teal11: "#0ac5b3",
};

const orangeDark = {
  // orange1: "#1f1206",
  // orange2: "#2b1400",
  // orange3: "#391a03",
  // orange4: "#441f04",
  // orange5: "#4f2305",
  // orange6: "#5f2a06",
  // orange7: "#763205",
  // orange8: "#943e00",
  orange9: "#f76808",
  orange10: "#ff802b",
  orange11: "#ff8b3e",
};

export const Colors = {
  ...purpleDark,
  ...pinkDark,
  ...violetDark,
  ...indigoDark,
  ...blueDark,
  ...cyanDark,
  ...tealDark,
  ...orangeDark,
};

export const getContrastColor = (color: string, percent: number = 80) => {
  const brightness = getBrightness(color);

  if (brightness === 0) {
    return shadeColor(color, -percent);
  } else {
    return shadeColor(color, percent);
  }
};

export const getBrightness = (hexcolor: string): 0 | 1 => {
  const brightness = getContrast(hexcolor);
  if (brightness === "#000000") {
    return 0;
  } else {
    return 1;
  }
};

export const getContrast = (hexcolor: string) => {
  if (!/^#[0-9A-F]{6}$/i.test(hexcolor)) {
    throw Error("Only accept hex color");
  }

  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

export function shadeColor(color: string, amount: number) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}
