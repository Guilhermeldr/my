import { createSignal, onCleanup, onMount } from "solid-js";

export function useScreenSize() {
  const [width, setWidth] = createSignal(window.innerWidth);
  const [height, setHeight] = createSignal(window.innerHeight);

  onMount(() => {
    window.addEventListener("resize", setDimensions);
  });

  onCleanup(() => {
    window.removeEventListener("resize", setDimensions);
  });

  const setDimensions = () => {
    if (window.innerWidth !== width()) {
      setWidth(window.innerWidth);
    }

    if (window.innerHeight !== height()) {
      setHeight(window.innerHeight);
    }
  };

  const isSmall = () => width() < 700;
  const isMedium = () => width() >= 700 && width() < 1000;
  const isLarge = () => width() >= 1000;

  /**
   * Returns true if the screen is in portrait mode
   */
  const isPortrait = () => height() >= width();

  /**
   * Returns true of the screen is in landscape mode
   */
  const isLandscape = () => width() >= height();

  return {
    isSmall,
    isMedium,
    isLarge,
    isPortrait,
    isLandscape,
    height,
    width,
  };
}
