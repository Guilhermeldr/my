import "@bitwild/vxdk/dist/style.css";
import { Box, Flex } from "@hope-ui/solid";
import { Component, createEffect, onCleanup, onMount, Show } from "solid-js";
import { useScreenSize } from "../../api/hooks/useScreenSize";
import { useVxdkContext } from "../../api/providers/vxdk.provider";
import ReactionsView from "./ReactionView";

let options = {
  // source: "https://videos.bitwildcdn.com/sample-stream/hls/master.m3u8",
  source:
    "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  showUI: true,
  muted: true,
  autoPlay: true,
  poster: "https://source.unsplash.com/user/leosplash/likes/1200x800",
};

type VideoViewProps = {};

export const VideoView: Component<VideoViewProps> = (props) => {
  const [state, { load, unload, controller }] = useVxdkContext();
  let containerRef: HTMLDivElement;

  createEffect(() => {
    console.log("props", props);
  });

  // const { updateParticipantMetadata } = useChannelActions();

  const { isSmall } = useScreenSize();

  onMount(() => {
    if (typeof window !== "undefined") {
      !controller && load(containerRef, options);
    }
  });

  onCleanup(() => {
    controller && unload();
  });

  return (
    <Flex
      borderRadius={10}
      position="relative"
      flex={1}
      justifyContent="center"
    >
      <Show when={!state.waitingForUser}>
        <Box position="absolute" zIndex={8} bottom={0} left={20} right={0}>
          {/* <SuperReactionView /> */}
        </Box>
        <Box position="absolute" zIndex={7} bottom={0} right={0}>
          {/* <PresentersList /> */}
        </Box>
        {/* <DrawCanvas /> */}
      </Show>
      <Box width={"100%"} ref={containerRef}></Box>
      <Box position="absolute" zIndex={1} bottom={0} right={0} left={0}>
        <ReactionsView />
      </Box>
    </Flex>
  );
};
