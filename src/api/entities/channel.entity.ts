import { Entity } from "./base.entity";

export enum ChannelType {
  Group = "Group",
  Public = "Public",
  Direct = "Direct",
}

export class ChannelMetadata {
  liveUsers?: number;
  totalUsers?: number;
}

export class Channel extends Entity {
  name: string;
  description: string;
  type: ChannelType;
  userId: string;
  metadata?: ChannelMetadata;
}
