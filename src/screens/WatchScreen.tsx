import { Component, onCleanup, onMount, Show } from "solid-js";
import { useChannelContext } from "../api/providers/channel.provider";
import { ChatProvider } from "../api/providers/chat.provider";
import { ParticipantsProvider } from "../api/providers/participants.provider";
import { VxdkProvider } from "../api/providers/vxdk.provider";
import WatchView from "../components/organisms/WatchView";

const WatchScreen: Component = () => {
  const [state, { joinChannel, leaveChannel }] = useChannelContext();

  onMount(() => {
    joinChannel({ passcode: null });
  });

  onCleanup(() => {
    leaveChannel();
  });

  return (
    <Show when={state.channel}>
      <VxdkProvider>
        <ParticipantsProvider channelId={state.channel.id}>
          <ChatProvider channelId={state.channel.id}>
            <WatchView />
          </ChatProvider>
        </ParticipantsProvider>
      </VxdkProvider>
    </Show>
  );
};

export default WatchScreen;
