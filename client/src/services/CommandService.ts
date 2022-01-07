import { AxiosError } from "axios";

import axiosClient from "../lib/axios";
import { GetCommands, GetCommandsAPIResponse } from "../lib/types";

export const getCommands = async (): Promise<GetCommands> => {
  try {
    const { data } = await axiosClient.get<GetCommandsAPIResponse>(
      `/commands/`
    );
    return {
      commands: data.commands || [],
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while fetching commands.";
    }
    return {
      commands: [],
      error,
    };
  }
};
