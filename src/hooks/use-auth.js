import { authApi } from "@/api-client";
import { useContext } from "react";
import { AppContext } from "./app-provider";
import { StorageKeys } from "@/components/constants";

export const useAuth = () => {
  const { setUserData } = useContext(AppContext);
  //   const swrResponse = useSWR("LOGIN_ACTION", () => authApi.login(payload));
  //   return swrResponse;
  const login = async (payload) => {
    const data = await authApi.login(payload);
    setUserData({
      username: data.data.username,
      accessToken: data.data.accessToken,
      email: data.data.email,
      roles: data.data.roles,
    });
    localStorage.setItem(
      StorageKeys.USER_INFO,
      JSON.stringify({
        username: data.data.username,
        email: data.data.email,
      })
    );
  };

  const logout = async () => {
    await authApi.logout();
    setUserData({});
    localStorage.removeItem(StorageKeys.USER_INFO);
  };

  return { login, logout };
};
