import axios from "axios";

axios.defaults.withCredentials = true;

export const verifyTwitchCode = async (code: string) => {
  console.log(code);
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/twitch/auth/verifyCode?code=${code}`
  );
  return data;
};

export const getUserData = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/twitch/user/me`
  );
  return data;
};
