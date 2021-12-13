import axios from "axios";
import { GetUserResponse } from "../lib/types";

axios.defaults.withCredentials = true;

export class TwitchService {
  static async verifyCode(code: string) {
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}/twitch/auth/verifyCode?code=${code}`
      );
      return {
        success: true,
        error: null,
      };
    } catch (e) {
      return {
        success: false,
        error: e,
      };
    }
  }

  static async getUserData() {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/twitch/user/me`
    );
    return data as GetUserResponse;
  }
}
