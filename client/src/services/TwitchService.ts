import axios, { AxiosError } from "axios";
import { User, VerifyCodeResponse } from "../lib/types";

axios.defaults.withCredentials = true;

export class TwitchService {
  static async verifyCode(code: string): Promise<VerifyCodeResponse> {
    let success = false;
    let error = null;
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/twitch/auth/verifyCode?code=${code}`
      );
      success = true;
    } catch (err) {
      const responseError = err as AxiosError;
      if (responseError.response?.data.status === 401) {
        error = responseError.response.data.message;
      } else {
        error = "Error while connecting to Twitch.";
      }
    }
    return {
      success,
      error,
    };
  }

  static async getUserData() {
    let data: User | null = null;
    let error: string | null = null;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/twitch/user/me`
      );
      data = response.data;
    } catch (err) {
      const responseError = err as AxiosError;
      if (responseError.response?.data.status === 401) {
        error = responseError.response.data.message;
      } else {
        error = "Error while connecting to Twitch.";
      }
    }
    return {
      data,
      error,
    };
  }
}
