import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export function useOnLayout() {
  const [rect, setRect] = createStore({ width: 0, height: 0 });

  const [ref, setRef] = createSignal<HTMLElement>(null);

  createEffect(() => {
    if (ref()) {
      setRect("width", ref().clientWidth);
      setRect("height", ref().clientHeight);
      window.addEventListener("resize", (_) => {
        setRect("width", ref().clientWidth);
        setRect("height", ref().clientHeight);
      });
    }
  });

  return { rect, setEl: setRef };
}
