import { Command, Scheduler, User } from ".";

export type Message = {
  status: number;
  message: string;
};

export type Success = {
  success: boolean;
  error: string | null;
};

/** User Responses */

export type GetUserDataAPIResponse = {
  user: User | null;
};

export type GetUserData = {
  user: User | null;
  error: string | null;
};

/** Command Responses */

export type GetCommandsAPIResponse = {
  commands: Array<Command>;
};

export type GetCommands = {
  commands: Array<Command>;
  error: string | null;
};

export type GetCommandByIdAPIResponse = {
  command: Command;
};

export type GetCommandById = {
  command: Command | null;
  error: string | null;
};

/** Prefix Responses */

export type GetPrefixAPIResponse = {
  prefix: string;
};

export type GetPrefix = {
  prefix: string | null;
  error: string | null;
};

/** Scheduler Responses */

export type GetSchedulersAPIResponse = {
  schedulers: Array<Scheduler>;
};

export type GetSchedulers = {
  schedulers: Array<Scheduler>;
  error: string | null;
};

export type GetSchedulerAPIResponse = {
  scheduler: Scheduler;
};

export type GetScheduler = {
  scheduler: Scheduler | null;
  error: string | null;
};
