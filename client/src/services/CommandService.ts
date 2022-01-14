import { AxiosError } from "axios";

import axiosClient from "../lib/axios";
import {
  Command,
  GetCommandById,
  GetCommandByIdAPIResponse,
  GetCommands,
  GetCommandsAPIResponse,
  Success,
} from "../lib/types";

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

export const getCommandById = async (id: string): Promise<GetCommandById> => {
  try {
    const { data } = await axiosClient.get<GetCommandByIdAPIResponse>(
      `/commands/byId/${id}`
    );
    return {
      command: data.command || null,
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
      command: null,
      error,
    };
  }
};

export const createCommand = async (newCommand: Command): Promise<Success> => {
  try {
    await axiosClient.post("/commands/", newCommand);

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while creating the command.";
    }
    return {
      success: false,
      error,
    };
  }
};

export const updateCommand = async (
  updatedCommand: Command
): Promise<Success> => {
  try {
    await axiosClient.put(`/commands/${updatedCommand.id}`, updatedCommand);

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while creating the command.";
    }
    return {
      success: false,
      error,
    };
  }
};

export const deleteCommand = async (id: string) => {
  try {
    await axiosClient.delete(`/commands/${id}`);

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while creating the command.";
    }
    return {
      success: false,
      error,
    };
  }
};
