import { ConductorPlugin } from "@bitwild/vxdk";
import { Timestamp } from "firebase/firestore";
import { Component, createEffect } from "solid-js";
import { useConductorContext } from "../../api/providers/conductor.provider";
import { useVxdkContext } from "../../api/providers/vxdk.provider";

const ConductorListener: Component = (props) => {
  const { store } = useConductorContext();

  const [_, { controller }] = useVxdkContext();

  createEffect((): void => {
    if (controller) {
      const conductor = controller.getPlugin(ConductorPlugin);

      if (store.syncData) {
        // Do not override volume
        const syncData = { ...store.syncData };
        syncData.clientReceivedAt = Timestamp.now().toMillis();
        delete syncData.player.volume;
        conductor.runSync(syncData);
      }
    }
  });

  return null;
};

export default ConductorListener;
