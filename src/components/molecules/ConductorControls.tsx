import { SourcePlayerDto } from "@bitwild/vxdk";
import { Component, createEffect } from "solid-js";
import { useChannelContext } from "../../api/providers/channel.provider";
import { useVxdkContext } from "../../api/providers/vxdk.provider";
import ConductorService from "../../api/services/conductor.service";

const conductorService = ConductorService.getInstance();

const ConductorControls: Component = () => {
  const [state, { controller }] = useVxdkContext();
  const [channelState] = useChannelContext();

  const updateSyncTime = async (throttle = false) => {
    if (!controller) return;

    const syncData: SourcePlayerDto = {
      currentTime: controller.getCurrentTime(),
      playing: controller.isPlaying(),
      volume: controller.getVolume(),
      muted: controller.isMuted(),
      lockControls: true,
    };

    if (throttle) {
      await conductorService.throttleUpdateSync(
        channelState.channel.id,
        syncData
      );
    } else {
      await conductorService.sendSyncData(channelState.channel.id, syncData);
    }
  };

  createEffect(() => {
    state.currentTime;
    updateSyncTime(true);
  });

  return null;
};

export default ConductorControls;
