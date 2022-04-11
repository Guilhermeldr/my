import {
  getDoc,
  onSnapshot,
  QueryDocumentSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { Component, createContext, useContext } from "solid-js";
import { createStore, DeepReadonly } from "solid-js/store";
import { Channel } from "../entities/channel.entity";
import { firebaseAuth, FirebaseCollections } from "../firebase";
import {
  CanJoinChannelResponseDto,
  JoinChannelRequestDto,
  Participant,
} from "../sdk";
import ChannelAPI from "../services/channel.service";
import { PresenceService } from "../services/presence.service";

type ChannelStore = [DeepReadonly<ChannelState>, ChannelActions];

interface ChannelActions {
  leaveChannel: () => Promise<void>;
  canJoin: () => Promise<CanJoinChannelResponseDto>;
  joinChannel: (dto?: JoinChannelRequestDto) => Promise<void>;
}

interface ChannelState {
  channel: QueryDocumentSnapshot<Channel>;
  participant: Participant;
  error: any;
  loading: boolean;
}

const ChannelContext = createContext<ChannelStore>({} as ChannelStore);

export const useChannelContext = () => useContext(ChannelContext);

type ChannelProviderProps = {
  channelId: string;
};

export const ChannelProvider: Component<ChannelProviderProps> = (props) => {
  let passcodeRef: string = null;
  let subscriptionsRef: Unsubscribe[] = [];

  const [state, setState] = createStore<ChannelState>({} as ChannelState);

  const connect = () => {
    const userId = firebaseAuth.currentUser.uid;

    // Connect to set presence
    PresenceService.connect(props.channelId, userId);

    const channelSub = onSnapshot(
      FirebaseCollections.channel(props.channelId),
      (snapshot) => {
        setState("channel", snapshot as QueryDocumentSnapshot<Channel>);
      }
    );

    const participantSub = onSnapshot(
      FirebaseCollections.participant(props.channelId, userId),
      (snapshot) => {
        const participant = snapshot.data();
        setState("participant", participant);
      }
    );

    subscriptionsRef.push(channelSub, participantSub);
  };

  const leaveChannel = async () => {
    subscriptionsRef.forEach((sub) => sub());
    subscriptionsRef = [];

    setState("channel", null);
    setState("participant", null);
  };

  const canJoin = async () => {
    try {
      return await ChannelAPI.canJoin(props.channelId);
    } catch (err) {
      setState("error", err);
      throw err;
    }
  };

  const joinChannel = async (dto?: JoinChannelRequestDto) => {
    try {
      setState("loading", true);
      const res = await ChannelAPI.join(props.channelId, dto);
      const channelDoc = await getDoc(
        FirebaseCollections.channel(props.channelId)
      );
      setState("channel", channelDoc);

      connect();

      passcodeRef = dto.passcode;
    } catch (error) {
      setState("error", error);
      throw error;
    } finally {
      setState("loading", false);
    }
  };

  const store: ChannelStore = [
    state,
    {
      joinChannel,
      leaveChannel,
      canJoin,
    },
  ];

  return (
    <ChannelContext.Provider value={store}>
      {props.children}
    </ChannelContext.Provider>
  );
};
