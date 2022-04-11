import { Colors } from "./colors";

function getAvatarColors() {
  return Object.keys(Colors).map((key) => {
    return Colors[key];
  });
}

const avatarColors: string[] = getAvatarColors();

export function getUserNameColor(userName = "") {
  try {
    return avatarColors[hashCode(userName) % avatarColors.length];
  } catch (err) {
    console.error(err);
    return avatarColors[0];
  }
}

export function hashCode(text = "") {
  let i: number;
  let chr: number;
  let hash: number = 0;

  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getDisplayNameInitials(displayName = "") {
  try {
    const names = displayName.split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    } else {
      return `${names[0]?.charAt(0) ?? ""}${names[1]?.charAt(0) ?? ""}`
        .toUpperCase()
        .trim();
    }
  } catch (err) {
    console.error(err);
  }
}

export const getRelativeTime = (date: Date) => {
  const difference = (new Date().getTime() - date.getTime()) / 1000;

  if (difference < 60) {
    // Less than a minute has passed:
    return `${Math.floor(difference)} sec ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    return `${Math.floor(difference / 60)} min ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    return `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    return `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    return `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    return `${Math.floor(difference / 31449600)} years ago`;
  }
};

export function getLang() {
  if (navigator.languages != undefined) return navigator.languages[0];
  return navigator.language;
}
