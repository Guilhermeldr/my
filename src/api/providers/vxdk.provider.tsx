import Vxdk, {
  CONTEXT_EVENT,
  Controller,
  Disposable,
  Options,
  StateDto,
  VXDKDefaultState,
} from "@bitwild/vxdk";
import { Component, createContext, onCleanup, useContext } from "solid-js";
import { createStore, DeepReadonly, reconcile } from "solid-js/store";

type LoadFn = (ref: HTMLElement, options: Partial<Options>) => Promise<void>;

type VxdkStore = [DeepReadonly<StateDto>, VxdkActions];

interface VxdkActions {
  load: LoadFn;
  controller: Controller;
  unload: () => void;
}

const VxdkContext = createContext<VxdkStore>({} as VxdkStore);

export const useVxdkContext = () => useContext(VxdkContext);

export const VxdkProvider: Component = (props) => {
  const [state, setState] = createStore<StateDto>(VXDKDefaultState);
  let controller: Controller;
  let subscriptionsRef: Disposable[] = [];

  onCleanup(() => {
    return () => controller?.destroy();
  });

  const load: LoadFn = async (containerRef, options) => {
    if (containerRef) {
      const vxdkController = Vxdk.init(containerRef, options);

      // Only set controller after is ready
      vxdkController.on(CONTEXT_EVENT.READY, () => {
        controller = vxdkController;
      });

      const stateSub = vxdkController.on(CONTEXT_EVENT.STATE_CHANGED, () => {
        setState(reconcile(vxdkController.getState()));
      });
      subscriptionsRef.push(stateSub);
    }
  };

  const unload = () => {
    controller?.destroy();
    controller = null;
    subscriptionsRef.forEach((sub) => sub.dispose());
    subscriptionsRef = [];
  };

  const store: VxdkStore = [
    state,
    {
      load,
      controller,
      unload,
    },
  ];

  return (
    <VxdkContext.Provider value={store}>{props.children}</VxdkContext.Provider>
  );
};
