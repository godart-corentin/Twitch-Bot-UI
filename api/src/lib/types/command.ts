export type CommandPolicies = {
  admin?: boolean
  mod?: boolean
  others?: boolean
}

export type Command = {
  id?: string
  name: string
  command: string
  message: string
  policies: CommandPolicies
}

export type CommandFile = {
  prefix: string
  commands: Array<Command>
}

// CommandService Types
export type GetCommandOptions = { name?: string; id?: string }
