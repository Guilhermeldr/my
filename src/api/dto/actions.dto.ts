export enum ActionType {
  CONFETTI = "CONFETTI",
  POLL = "POLL",
}

export interface ActionDto {
  timestamp?: number;
  type: ActionType;
  data?: any;
  id: string;
}
