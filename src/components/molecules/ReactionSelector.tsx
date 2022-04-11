import { Box, Flex } from "@hope-ui/solid";
import { Component, For } from "solid-js";
import { useChatContext } from "../../api/providers/chat.provider";

type ReactionSelectorProps = {
  onSelect: (reaction: string) => void;
};

const ReactionSelector: Component<ReactionSelectorProps> = (props) => {
  const [_, actions] = useChatContext();
  const onSend = async (emoji: string) => {
    props.onSelect(emoji);
    await actions.sendBroadcast({
      data: { emoji },
      type: "REACTION",
    });
  };

  const emojiReactions = ["😂", "❤️", "👍", "😥", "👎", "😡"];

  const emojiWidth = () => 100 / emojiReactions.length + "%";

  return (
    <Flex flex="1" justifyContent="space-between" alignItems="center">
      <For each={emojiReactions}>
        {(emoji) => (
          <Box as="button" width={emojiWidth()} onClick={() => onSend(emoji)}>
            {emoji}
          </Box>
        )}
      </For>
    </Flex>
  );
};

export default ReactionSelector;
