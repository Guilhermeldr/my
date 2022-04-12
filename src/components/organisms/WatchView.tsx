import { Flex } from "@hope-ui/solid";
import { Component, Match, Switch } from "solid-js";
import { useOnLayout } from "../../api/hooks/useOnLayout";
import { useScreenSize } from "../../api/hooks/useScreenSize";
import { useChannelContext } from "../../api/providers/channel.provider";
import { EnumParticipantRole } from "../../api/sdk";
import ConductorControls from "../molecules/ConductorControls";
import { VideoView } from "../molecules/VideoView";
import SideDrawer from "./SideDrawer";

const WatchView: Component = () => {
  const { isSmall, height } = useScreenSize();
  const { rect, setEl } = useOnLayout();
  const [state] = useChannelContext();

  const isModerator = () => {
    return (
      state.participant?.role === EnumParticipantRole.MODERATOR ||
      state.participant?.role === EnumParticipantRole.ADMIN
    );
  };

  return (
    <Flex
      flexDirection={isSmall() ? "column" : "row"}
      flex={1}
      height={height()}
      overflow="hidden"
    >
      <Flex
        ref={setEl}
        flexDirection={isSmall() ? "column" : "row"}
        flex={1}
        alignItems="center"
      >
        <VideoView />
      </Flex>

      <SideDrawer width={isSmall() ? "100%" : 325} />
      <Switch>
        <Match when={isModerator()}>
          <ConductorControls />
        </Match>
        <Match when={!isModerator()}>
          <ConductorControls />
        </Match>
      </Switch>
    </Flex>
  );
};

export default WatchView;
