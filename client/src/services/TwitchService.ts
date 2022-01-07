import { AxiosError } from "axios";

import { GetUserDataResponse, User, VerifyCodeResponse } from "../lib/types";
import axiosClient from "../lib/axios";

export const verifyCode = async (code: string): Promise<VerifyCodeResponse> => {
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

export const getUserData = async (): Promise<GetUserDataResponse> => {
  try {
    const { data } = await axiosClient.get<User | null>("/twitch/user/me");
    return {
      user: data,
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
