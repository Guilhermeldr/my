import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
  VStack,
} from "@hope-ui/solid";
import { signOut } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "solid-app-router";
import { IoEllipsisVerticalSharp, IoSend } from "solid-icons/io";
import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { firebaseAuth } from "../../api/firebase";
import { getRelativeTime } from "../../api/helpers/utils";
import { useChannelContext } from "../../api/providers/channel.provider";
import { useChatContext } from "../../api/providers/chat.provider";
import { EnumSendMessageDtoType, Message } from "../../api/sdk";
import ParticipantAvatar from "../atoms/ParticipantAvatar";
import ParticipantCountView from "../molecules/ParticipantCountView";
import ReactionSelector from "../molecules/ReactionSelector";

type MessageItemProps = {
  message: Message;
  previousMessage?: Message;
  nextMessage?: Message;
};
const MessageItem: Component<MessageItemProps> = (props) => {
  const message = () => props.message;

  const sender = () => message().sender;
  const lastSender = () => props.previousMessage?.sender;
  const nextSender = () => props.nextMessage?.sender;

  const displayName = () => sender().displayName;
  const content = () => message().content;

  const isFirstMessage = () => {
    return lastSender()?.userId !== sender()?.userId;
  };

  const isSameThread = () => {
    return nextSender()?.userId === sender()?.userId;
  };

  const timestamp = () =>
    (message().createdAt as unknown as Timestamp).toDate();

  return (
    <Box>
      <VStack
        marginBottom={isSameThread() ? 0 : "$2"}
        alignItems="start"
        borderRadius={3}
        justifyContent="center"
      >
        <Show when={isFirstMessage()}>
          <HStack justifyContent="flex-start" marginLeft={40} marginBottom="$1">
            <Text as="span" size="sm" color="white" fontWeight="$bold">
              {displayName()}{" "}
              <Text
                as="span"
                size="xs"
                fontWeight="$normal"
                marginLeft="$1"
                color={"$whiteAlpha8"}
              >
                {getRelativeTime(timestamp())}
              </Text>
            </Text>
          </HStack>
        </Show>

        <HStack>
          <Show when={isFirstMessage()} fallback={<Box width={40} />}>
            <ParticipantAvatar
              size="sm"
              displayName={displayName()}
              photoUrl={sender().photoUrl}
              marginRight="$2"
            />
          </Show>
          <Box
            backgroundColor="$whiteAlpha5"
            padding="4px 12px"
            marginRight="$1"
            marginBottom="$1"
            borderRadius={10}
            flex={1}
          >
            <Text as="span" size="sm" fontWeight="$normal">
              {content()}
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

const ChatView: Component = () => {
  const [state, actions] = useChatContext();
  const [_, channelActions] = useChannelContext();
  const [value, setValue] = createSignal("");
  const [selectedEmoji, setSelectedEmoji] = createSignal("👍");
  const navigate = useNavigate();

  const handleInput = (event: any) => setValue(event.target.value);

  let scrollTargetElement!: HTMLDivElement;

  function scrollToBottom() {
    scrollTargetElement.scroll({
      top: scrollTargetElement.scrollHeight,
      behavior: "smooth",
    });
  }

  createEffect(() => {
    // Trigger on new message
    if (state.messages.length > 0) {
      scrollToBottom();
    }
  });

  const handleSubmit = async () => {
    if (!canSend()) return;

    const content = value();
    setValue("");

    await actions.sendMessage({
      type: EnumSendMessageDtoType.Text,
      content,
    });
  };

  const onSignOut = async () => {
    await channelActions.leaveChannel();
    await signOut(firebaseAuth);
    navigate("/");
  };

  const onKeyDown = (key: string) => {
    key === "Enter" && handleSubmit();
  };

  const canSend = () => {
    return value().length > 0;
  };

  const onChangeName = () => {};

  return (
    <Flex flexDirection="column" width="100%">
      <HStack
        padding={10}
        width="100%"
        borderBottom="1px solid rgba(255,255,255,0.2)"
      >
        <Heading>Chat</Heading>
        <Spacer />

        <ParticipantCountView />
        <Box marginLeft="$2">
          <Menu>
            <MenuTrigger
              as={IconButton}
              aria-label="Open Menu"
              colorScheme="primary"
              variant="ghost"
              size="sm"
              icon={<Icon as={IoEllipsisVerticalSharp} />}
            ></MenuTrigger>
            <MenuContent>
              <MenuItem onSelect={onChangeName}>Change Name</MenuItem>
              <MenuItem onSelect={onSignOut}>Sign out</MenuItem>
            </MenuContent>
          </Menu>
        </Box>
      </HStack>

      <Flex
        overflowY="auto"
        flex={1}
        flexDirection="column-reverse"
        ref={scrollTargetElement}
      >
        <For each={state.messages}>
          {(item, index) => (
            <MessageItem
              message={item}
              previousMessage={state.messages[index() + 1]}
              nextMessage={state.messages[index() - 1]}
            />
          )}
        </For>
      </Flex>

      <HStack
        spacing="$2"
        maxHeight={50}
        width="100%"
        // backgroundColor="red"
      >
        <Box>
          <Popover triggerMode="hover">
            <PopoverTrigger
              as={IconButton}
              colorScheme="neutral"
              aria-label="React"
              variant="subtle"
              icon={<Text as="div">{selectedEmoji()}</Text>}
            ></PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Send Reactions!</PopoverHeader>
              <PopoverBody>
                <ReactionSelector
                  onSelect={(value) => setSelectedEmoji(value)}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Input
          placeholder="Send message"
          onInput={handleInput}
          value={value()}
          onKeyDown={(value) => onKeyDown(value.key)}
        />

        <Box>
          <IconButton
            aria-label="Send"
            variant="subtle"
            icon={<Icon as={IoSend} />}
            disabled={!canSend()}
            onClick={handleSubmit}
          />
        </Box>
      </HStack>
    </Flex>
  );
};

export default ChatView;
