import {
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Unsubscribe,
  where,
} from "firebase/firestore";
import {
  Component,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { createStore, DeepReadonly, reconcile } from "solid-js/store";
import { FirebaseCollections } from "../firebase";
import { Presence } from "../sdk";
import { OnlineStatus, ParticipantRole } from "../types/enums";

interface ParticipantState {
  presenters: QueryDocumentSnapshot<Presence>[];
  participants: QueryDocumentSnapshot<Presence>[];
  error: any;
  loading: boolean;
}

type ParticipantStore = [DeepReadonly<ParticipantState>];

const defaultValues: ParticipantState = {
  presenters: [],
  participants: [],
  error: null,
  loading: false,
};

const ParticipantContext = createContext<ParticipantStore>([defaultValues]);

export const useParticipantsContext = () => useContext(ParticipantContext);

type ParticipantsProviderProps = {
  channelId: string;
};

export const ParticipantsProvider: Component<ParticipantsProviderProps> = (
  props
) => {
  const [state, setState] = createStore<ParticipantState>(defaultValues);

  let subscriptionsRef: Unsubscribe[] = [];

  onMount(() => connect());

  onCleanup(() => disconnect());

  const connect = () => {
    const queryPresenters = query(
      FirebaseCollections.presenceList(props.channelId),
      where("type", "in", [
        ParticipantRole.MODERATOR,
        ParticipantRole.PRESENTER,
      ]),
      where("status", "==", OnlineStatus.ONLINE)
    );

    const queryParticipants = query(
      FirebaseCollections.presenceList(props.channelId),
      where("status", "==", OnlineStatus.ONLINE),
      orderBy("participant.role")
    );

    const presenterSub = onSnapshot(queryPresenters, (snapshot) => {
      const presenters = snapshot.docs ?? [];
      setState("presenters", reconcile(presenters));
    });

    const participantsSub = onSnapshot(queryParticipants, (snapshot) => {
      const participants = snapshot.docs ?? [];

      setState("participants", reconcile(participants));
    });

    subscriptionsRef.push(presenterSub, participantsSub);
  };

  const disconnect = () => {
    subscriptionsRef.forEach((sub) => sub());
    subscriptionsRef = [];

    setState("presenters", []);
    setState("participants", []);
  };

  const store: ParticipantStore = [state];

  return (
    <ParticipantContext.Provider value={store}>
      {props.children}
    </ParticipantContext.Provider>
  );
};
