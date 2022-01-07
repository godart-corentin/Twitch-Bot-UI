import { User } from ".";

export type MessageResponse = {
  status: number;
  message: string;
};

export type VerifyCodeResponse = {
  success: boolean;
  error: string | null;
};

export type GetUserDataResponse = {
  user: User | null;
  error: string | null;
};
