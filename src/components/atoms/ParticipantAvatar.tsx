import { Avatar, AvatarProps } from "@hope-ui/solid";
import { Component } from "solid-js";
import { getContrastColor } from "../../api/helpers/colors";
import { getUserNameColor } from "../../api/helpers/utils";

type Props = {
  displayName?: string;
  photoUrl?: string;
} & AvatarProps;

const ParticipantAvatar: Component<Props> = (props) => {
  const color = () => getUserNameColor(props.displayName);
  const textColor = () => getContrastColor(color());

  return (
    <Avatar
      name={props.displayName ?? "Guest"}
      src={props.photoUrl ?? ""}
      {...props}
      color={textColor()}
      backgroundColor={color()}
    />
  );
};

export default ParticipantAvatar;
