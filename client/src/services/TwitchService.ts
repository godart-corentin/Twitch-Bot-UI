import { AxiosError } from "axios";

import { GetUserData, GetUserDataAPIResponse, Success } from "../lib/types";
import axiosClient from "../lib/axios";

export const verifyCode = async (code: string): Promise<Success> => {
  try {
    await axiosClient.get(`/twitch/auth/verifyCode?code=${code}`);
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
      error = "Error while connecting to Twitch.";
    }
    return {
      success: false,
      error,
    };
  }
};

export const getUserData = async (): Promise<GetUserData> => {
  try {
    const { data } = await axiosClient.get<GetUserDataAPIResponse>(
      "/twitch/user/me"
    );
    return {
      user: data.user,
      error: null,
    };
  } catch (err) {
    let error: string;
    const responseError = err as AxiosError;
    if (responseError.response?.data.status === 401) {
      error = responseError.response.data.message;
    } else {
      error = "Error while connecting to Twitch.";
    }

    return {
      user: null,
      error,
    };
  }
};
