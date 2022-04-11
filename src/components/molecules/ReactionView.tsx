import { Box } from "@hope-ui/solid";
import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { useReactionsList } from "../../api/hooks/useReactionsList";
import { useScreenSize } from "../../api/hooks/useScreenSize";
import { useChannelContext } from "../../api/providers/channel.provider";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const ReactionsView: Component = () => {
  const [state] = useChannelContext();
  const [width, setWidth] = createSignal(0);

  let boxRef: HTMLDivElement;

  const reactions = useReactionsList(state.channel.id);

  const { isSmall } = useScreenSize();
  const translateX = () => getRandomInt(40);
  const translateY = () => getRandomInt(isSmall() ? 20 : 60);
  const iconSize = () => 1 + getRandomInt(10) / 10;
  const animationWidth = () => -width() / (isSmall() ? 1.5 : 1.2);

  const sign = () => (translateX() % 2 == 0 ? "-" : "");
  const rotateZ = () => `${sign()}90deg`;

  const transform = () =>
    `translateX(${translateX()}px) translateY(${translateY()}px) rotateZ(0deg) scale(${iconSize()})`;

  const transformOnEnter = () =>
    `translateX(${animationWidth()}px) translateY(${translateY()}px) rotateZ(${rotateZ()})`;

  const duration = () => 3000 - getRandomInt(500);

  createEffect(() => {
    if (boxRef) {
      setWidth(boxRef.clientWidth);
    }
  });

  return (
    <Box
      ref={boxRef}
      width="100%"
      height={40}
      position="relative"
      pointerEvents="none"
    >
      <Show when={width() > 0}>
        <TransitionGroup
          onEnter={(el, done) => {
            const a = el.animate(
              [
                {},
                {
                  opacity: 0,
                  transform: transformOnEnter(),
                },
              ],
              {
                duration: duration(),
              }
            );
            a.finished.then(done);
          }}
          onExit={(el, done) => {
            const a = el.animate(
              [
                {
                  opacity: 0,
                },
              ],
              {
                duration: 0,
              }
            );
            a.finished.then(done);
          }}
        >
          <For each={reactions.reactions}>
            {(reaction) => (
              <Box
                position="absolute"
                as="span"
                transform={transform()}
                right={-20}
              >
                {reaction.val().data?.emoji}
              </Box>
            )}
          </For>
        </TransitionGroup>
      </Show>
    </Box>
  );
};

export default ReactionsView;
