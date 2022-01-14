export type LocationToastState = {
  toast: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | undefined;
  };
};
