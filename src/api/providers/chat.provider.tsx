import {
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
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
import {
  EnumSendMessageDtoType,
  Message,
  SendBroadcastDto,
  SendMessageDto,
} from "../sdk";
import ChannelAPI from "../services/channel.service";
import { useChannelContext } from "./channel.provider";

type ChatProviderStore = [DeepReadonly<ChatProviderState>, ChatProviderActions];

interface ChatProviderActions {
  sendMessage: (dto: SendMessageDto) => Promise<void>;
  sendBroadcast: (dto: SendBroadcastDto) => Promise<void>;
  setActiveExtension: (extension: ChatExtension) => void;
}

interface ChatProviderState {
  messages: Message[];
  activeExtension: ChatExtension;
}

interface ReactionMap {
  [key: string]: QueryDocumentSnapshot<Message>;
}

const chatContext = createContext<ChatProviderStore>({} as ChatProviderStore);

const useChatContext = () => useContext(chatContext);

type MessagesProviderProps = {
  channelId: string;
};

type SnapshotMessage = QueryDocumentSnapshot<Message>;

export enum ChatExtension {
  None,
  Reactions,
  SuperReactions,
}

const defaultValue: ChatProviderState = {
  messages: [],
  activeExtension: ChatExtension.None,
};

const ChatProvider: Component<MessagesProviderProps> = (props) => {
  const [state, setState] = createStore<ChatProviderState>(defaultValue);

  let subscriptionsRef: Unsubscribe[] = [];
  let previousMessageRef: SnapshotMessage[] = [];

  onMount(() => connect());
  onCleanup(() => disconnect());

  const connect = () => {
    const messageSub = onSnapshot(
      query(
        FirebaseCollections.messageList(props.channelId),
        orderBy("createdAt", "desc"),
        where("type", "==", EnumSendMessageDtoType.Text),
        limit(20)
      ),
      (snapshot) => {
        const previousMessages = previousMessageRef;
        const newMessages = handleMessageChanges(snapshot, previousMessages);

        previousMessageRef = newMessages;
        setState(
          "messages",
          reconcile(newMessages.map((value) => value.data()))
        );
      }
    );

    subscriptionsRef.push(messageSub);
  };

  const disconnect = () => {
    subscriptionsRef.forEach((sub) => sub());
    subscriptionsRef = [];
  };

  const sendMessage = async (dto: SendMessageDto) => {
    await ChannelAPI.sendMessage(props.channelId, dto);
  };

  const sendBroadcast = async (dto: SendBroadcastDto) => {
    await ChannelAPI.sendBroadcast(props.channelId, dto);
  };

  const setActiveExtensionFn = (extension: ChatExtension) => {
    setState("activeExtension", extension);
  };

  const store: ChatProviderStore = [
    state,
    { sendBroadcast, sendMessage, setActiveExtension: setActiveExtensionFn },
  ];

  return (
    <chatContext.Provider value={store}>{props.children}</chatContext.Provider>
  );
};

export { ChatProvider, useChatContext, useSuperReactions };

const handleMessageChanges = (
  snapshot: QuerySnapshot<Message>,
  previousMessages: QueryDocumentSnapshot<Message>[]
) => {
  const previous = [...previousMessages];
  const snapshotLength = snapshot.docs.length;

  // Snapshot still being filled
  if (snapshotLength > previous.length) {
    return snapshot.docs;
  }

  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      previous.unshift(change.doc);
    }
  });

  return previous;
};

function useSuperReactions() {
  const [channelState] = useChannelContext();

  const [state, setState] = createStore<{
    superReactions: QueryDocumentSnapshot<Message>[];
  }>({ superReactions: [] });

  let subscriptionsRef: Unsubscribe[] = [];
  let superReactionRef: ReactionMap = {};
  let isFirstSuperReactionSnapshot = false;

  onMount(() => connect());
  onCleanup(() => disconnect());

  const connect = () => {
    const superReactionsSub = onSnapshot(
      query(
        FirebaseCollections.messageList(channelState.channel.id),
        orderBy("createdAt", "desc"),
        where("type", "==", EnumSendMessageDtoType.SuperReaction),
        limit(1)
      ),
      { includeMetadataChanges: true },
      (snapshot) => {
        // Stop from loading first snapshot of reaction
        if (isFirstSuperReactionSnapshot) {
          isFirstSuperReactionSnapshot = false;
          return;
        }
        if (snapshot.docChanges({ includeMetadataChanges: true })) {
          snapshot
            .docChanges({ includeMetadataChanges: true })
            .forEach((change) => {
              if (change.type === "added") {
                superReactionRef[change.doc.id] = change.doc;
              }
            });
        }
        const superReactionList = Object.values(superReactionRef.current).map(
          (reaction) => reaction
        );

        setState("superReactions", reconcile(superReactionList));
      }
    );

    subscriptionsRef.push(superReactionsSub);
  };

  const removeSuperReaction = (reactionId: string) => {
    if (superReactionRef.current[reactionId]) {
      delete superReactionRef.current[reactionId];
    }
    const superReactionList = Object.values(superReactionRef.current).map(
      (reaction) => reaction
    );

    setState("superReactions", reconcile(superReactionList));
  };

  const disconnect = () => {
    subscriptionsRef.forEach((sub) => sub());
    subscriptionsRef = [];
  };

  return { superReactions: state, removeSuperReaction };
}
