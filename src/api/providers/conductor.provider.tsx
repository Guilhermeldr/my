import { SyncPlayerCommandDto } from "@bitwild/vxdk";
import {
  limitToLast,
  onChildAdded,
  onValue,
  query,
  Unsubscribe,
} from "firebase/database";
import {
  Component,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { createStore, DeepReadonly } from "solid-js/store";
import { ActionDto } from "../dto/actions.dto";
import { FirebaseCollections } from "../firebase";

//
interface Context {
  store: DeepReadonly<ConductorStore>;
}

interface ConductorStore {
  syncData: SyncPlayerCommandDto;
  actionData: ActionDto;
}

const conductorContext = createContext<Context>({} as Context);

const useConductorContext = () => useContext(conductorContext);

type ConductorProps = {
  channelId: string;
};

const ConductorProvider: Component<ConductorProps> = (props) => {
  const [store, setStore] = createStore<ConductorStore>({} as ConductorStore);

  let subscriptionsRef: Unsubscribe[] = [];
  let notFirstReaction = false;

  onMount(() => connect(props.channelId));

  onCleanup(() => disconnect());

  const connect = (channelId: string) => {
    console.log("Connecting to Conductor", channelId);
    const syncDbRef = query(
      FirebaseCollections.conductorSync(channelId),
      limitToLast(1)
    );

    const syncSub = onChildAdded(syncDbRef, (snapshot) => {
      const syncData = snapshot.val();
      setStore("syncData", syncData);
    });

    const actionsRef = FirebaseCollections.conductorBroadcasts(channelId);

    const reactionsSub = onValue(actionsRef, (snapshot) => {
      const actionData = snapshot.val();
      if (notFirstReaction) {
        setStore("actionData", actionData);
      } else {
        notFirstReaction = true;
      }
    });

    subscriptionsRef.push(syncSub, reactionsSub);
  };

  const disconnect = () => {
    subscriptionsRef.forEach((sub) => sub());
    subscriptionsRef = [];
  };

  return (
    <conductorContext.Provider value={{ store }}>
      {props.children}
    </conductorContext.Provider>
  );
};

export { ConductorProvider, useConductorContext };
