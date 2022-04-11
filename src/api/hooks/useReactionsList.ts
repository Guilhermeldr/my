import { Unsubscribe } from "firebase/auth";
import {
  DataSnapshot,
  limitToLast,
  onChildAdded,
  onValue,
  query,
} from "firebase/database";
import { throttle } from "lodash";
import { onCleanup, onMount } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { FirebaseCollections } from "../firebase";

type ReactionsState = {
  reactions: DataSnapshot[];
};

export function useReactionsList(channelId: string) {
  const [state, setState] = createStore<ReactionsState>({ reactions: [] });

  let reactionsRef: DataSnapshot[] = [];
  let hasLoaded = false;
  let unsubscribe: Unsubscribe;

  onMount(() => {
    onValue(colRef(), onInitialLoad, null, { onlyOnce: true });
    unsubscribe = onChildAdded(colRef(), handleOnChildAdded);
  });

  onCleanup(() => {
    hasLoaded = false;
    reactionsRef = [];
    unsubscribe();
  });

  const colRef = () => {
    return query(
      FirebaseCollections.broadcasts(channelId, "REACTION"),
      limitToLast(1)
    );
  };

  const onInitialLoad = (_: DataSnapshot) => {
    setTimeout(() => (hasLoaded = true), 500);
  };

  const handleOnChildAdded = throttle((snapshot: DataSnapshot) => {
    if (!hasLoaded) return;
    // TODO: Limit size of array here
    // Keep the array small on teh screen
    if (reactionsRef.length > 30) {
      return;
    }

    reactionsRef.push(snapshot);
    setTimeout(() => {
      reactionsRef = reactionsRef.filter(function (obj) {
        return obj.ref.key !== snapshot.ref.key;
      });
      setState("reactions", [...reactionsRef]);
    }, 3000);

    console.log("reactionsRef", reactionsRef.length);
    setState("reactions", [...reactionsRef]);
  }, 0);

  return state;
}
