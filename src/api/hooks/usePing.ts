import { onMount } from "solid-js";
import ChannelAPI from "../services/channel.service";

export function usePing() {
  const doPing = async () => {
    await ChannelAPI.ping();
  };

  onMount(() => doPing());

  return;
}
