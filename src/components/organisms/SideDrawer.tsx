import { Flex } from "@hope-ui/solid";
import { Component } from "solid-js";
import ChatView from "./ChatView";

type Props = {
  width: string | number;
};
const SideDrawer: Component<Props> = (props) => {
  return (
    <Flex
      maxWidth={props.width}
      paddingBottom="$2"
      paddingLeft="$2"
      overflow="auto"
      borderLeft="1px solid $whiteAlpha5"
    >
      <ChatView />
    </Flex>
  );
};

export default SideDrawer;
