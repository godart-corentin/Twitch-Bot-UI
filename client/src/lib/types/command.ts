export type CommandPolicies = {
  admin?: boolean;
  mod?: boolean;
  others?: boolean;
};

export type Command = {
  id?: string;
  name: string;
  command: string;
  message: string;
  policies: CommandPolicies;
};

export type AddOrUpdateCommandData = {
  name: string;
  command: string;
  message: string;
};
