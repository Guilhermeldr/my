import { AvatarExcess, AvatarGroup, HStack, Text } from "@hope-ui/solid";
import { Component, For, Show } from "solid-js";
import { useParticipantsContext } from "../../api/providers/participants.provider";
import ParticipantAvatar from "../atoms/ParticipantAvatar";

const ParticipantCountView: Component = () => {
  const [participantState] = useParticipantsContext();

  const topParticipants = () =>
    participantState.participants
      .map((participant) => participant.data())
      .slice(0, 2);

  const liveUsers = () => {
    return participantState.participants.length;
  };

  const participantLabel = () => {
    return liveUsers() === 1 ? "Participant" : "Participants";
  };

  const excessUsers = () => {
    return participantState.participants.length - topParticipants().length;
  };

  return (
    <HStack>
      <AvatarGroup marginRight="$2">
        <For each={topParticipants()}>
          {({ participant }) => (
            <ParticipantAvatar
              size="sm"
              displayName={participant.displayName}
              photoUrl={participant.photoUrl}
            />
          )}
        </For>
        <Show when={excessUsers() > 0}>
          <AvatarExcess size="sm">{`+${excessUsers()}`}</AvatarExcess>
        </Show>
      </AvatarGroup>
      <Text size="sm">{participantLabel()}</Text>
    </HStack>
  );
};

export default ParticipantCountView;
