import { Command, User } from ".";

export type Message = {
  status: number;
  message: string;
};

export type Success = {
  success: boolean;
  error: string | null;
};

/** Get User Data */
export type GetUserDataAPIResponse = {
  user: User | null;
};

export type GetUserData = {
  user: User | null;
  error: string | null;
};

/** Get Commands */
export type GetCommandsAPIResponse = {
  commands: Array<Command>;
};

export type GetCommands = {
  commands: Array<Command>;
  error: string | null;
};
