import "@bitwild/vxdk/dist/style.css";
import { Box, Flex } from "@hope-ui/solid";
import { Component, onCleanup, onMount, Show } from "solid-js";
import { nftApiKey } from "../../api/config";
import { useScreenSize } from "../../api/hooks/useScreenSize";
import { useChannelContext } from "../../api/providers/channel.provider";
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
  const [channelState] = useChannelContext();
  let containerRef: HTMLDivElement;

  const source = () => channelState.channel.data().metadata.videoUrl;
  const nftAddress = () =>
    channelState.channel.data()?.metadata?.nftAddress ??
    "0xd3d300261aef33b4b0561f58156337fe7885ae01";

  // const { updateParticipantMetadata } = useChannelActions();

  const { isSmall } = useScreenSize();

  onMount(() => {
    if (typeof window !== "undefined") {
      !controller &&
        load(containerRef, {
          ...options,
          plugins: {
            "confirm-play": {
              source: source(),
              apiKey: nftApiKey,
              nftContract: nftAddress(),
            },
          },
        });
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
      <Box position="absolute" zIndex={10} bottom={0} right={0} left={0}>
        <ReactionsView />
      </Box>
    </Flex>
  );
};
