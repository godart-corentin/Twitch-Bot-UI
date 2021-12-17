export type MessageResponse = {
  status: number;
  message: string;
};

export type VerifyCodeResponse = {
  success: boolean;
  error: string | null;
};
