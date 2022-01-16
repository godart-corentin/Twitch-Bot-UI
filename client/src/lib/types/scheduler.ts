export type Scheduler = {
  id?: string;
  name: string;
  random?: boolean;
  minutes: number;
  messages: Array<string>;
};

export type AddOrUpdateSchedulerData = {
  name: string;
  minutes: number;
};
