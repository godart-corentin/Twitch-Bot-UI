import { AxiosError } from "axios";

import axiosClient from "../lib/axios";
import { GetPrefix, GetPrefixAPIResponse } from "../lib/types";

export const getPrefix = async (): Promise<GetPrefix> => {
  try {
    const { data } = await axiosClient.get<GetPrefixAPIResponse>(`/prefix/`);
    return {
      prefix: data.prefix,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while fetching prefix.";
    }
    return {
      prefix: null,
      error,
    };
  }
};

export const updatePrefix = async (newPrefix: string): Promise<GetPrefix> => {
  try {
    const { data } = await axiosClient.put<GetPrefixAPIResponse>(`/prefix/`, {
      prefix: newPrefix,
    });
    return {
      prefix: data.prefix,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while updating prefix.";
    }
    return {
      prefix: null,
      error,
    };
  }
};
