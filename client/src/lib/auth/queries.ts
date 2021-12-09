import { useQuery } from "react-query";
import { getUserData, verifyTwitchCode } from ".";

export const useVerifyCode = (code: string) => {
  return useQuery(["verifyTwitchCode", code], () => verifyTwitchCode(code), {
    enabled: code.length > 0,
    refetchOnWindowFocus: false,
  });
};

export const useUserData = () => {
  return useQuery("userData", getUserData, {
    refetchOnWindowFocus: false,
  });
};
