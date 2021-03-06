import { Spinner } from "@hope-ui/solid";
import { useParams } from "solid-app-router";
import { Component, Match, onCleanup, onMount, Switch } from "solid-js";
import {
  ChannelProvider,
  useChannelContext,
} from "../api/providers/channel.provider";
import { ChatProvider } from "../api/providers/chat.provider";
import { ParticipantsProvider } from "../api/providers/participants.provider";
import { VxdkProvider } from "../api/providers/vxdk.provider";
import CompleteProfileView from "../components/organisms/CompleteProfileView";
import WatchView from "../components/organisms/WatchView";

const WatchScreen: Component = () => {
  const params = useParams();

  return (
    <ChannelProvider channelId={params.id}>
      <WatchContainer />
    </ChannelProvider>
  );
};

const WatchContainer: Component = () => {
  const [state, actions] = useChannelContext();

  onMount(() => {
    actions.joinChannel({ passcode: null });
  });

  onCleanup(() => {
    actions.leaveChannel();
  });

  return (
    <Switch>
      <Match when={state.loading}>
        <Spinner />
      </Match>
      <Match when={state.channel}>
        <VxdkProvider>
          <ParticipantsProvider channelId={state.channel.id}>
            <ChatProvider channelId={state.channel.id}>
              <CompleteProfileView />
              <WatchView />
            </ChatProvider>
          </ParticipantsProvider>
        </VxdkProvider>
      </Match>
    </Switch>
  );
};

export default WatchScreen;
