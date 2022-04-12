import { Flex } from "@hope-ui/solid";
import { Component } from "solid-js";
import { useOnLayout } from "../../api/hooks/useOnLayout";
import { useScreenSize } from "../../api/hooks/useScreenSize";
import { VideoView } from "../molecules/VideoView";
import SideDrawer from "./SideDrawer";

const WatchView: Component = () => {
  const { isSmall, height } = useScreenSize();
  const { rect, setEl } = useOnLayout();

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
    </Flex>
  );
};

export default WatchView;
