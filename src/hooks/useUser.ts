import { create } from "zustand";
import axios from "axios";

interface User {
  token: string;
  isAuthenticated: boolean;
}

interface useUserProps {
  user: User;
  login: (
    username: string,
    password: string
  ) => Promise<{ authenticated: boolean }>;
  verifyUser: () => { redirectTo: "home" | "login" };
  logout: () => void;
}

export const useUser = create<useUserProps>((set) => ({
  user: localStorage.getItem("acmeAuthUser")
    ? JSON.parse(localStorage.getItem("acmeAuthUser")!)
    : {
        token: "",
        isAuthenticated: false,
      },

  login: async (username: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASEPATH}/login`,
        {
          username,
          password,
        }
      );
      if (data.token) {
        const authenticatedUser: User = {
          token: data.token,
          isAuthenticated: true,
        };
        localStorage.setItem("acmeAuthUser", JSON.stringify(authenticatedUser));
        set({ user: authenticatedUser });
        return { authenticated: true };
      }
      return { authenticated: false };
    } catch (error) {
      console.log(error);
      return { authenticated: false };
    }
  },

  verifyUser: () => {
    const authUser = localStorage.getItem("acmeAuthUser")
      ? (JSON.parse(localStorage.getItem("acmeAuthUser")!) as User)
      : null;

    if (authUser && authUser?.isAuthenticated) {
      return { redirectTo: "home" };
    }
    return { redirectTo: "login" };
  },

  logout: () => {
    localStorage.removeItem("acmeAuthUser");
    set({ user: { token: "", isAuthenticated: false } });
  },
}));
