import axios from "axios";

export function getToken() {
  const authUser = localStorage.getItem("acmeAuthUser");
  let token = "";

  if (authUser) {
    try {
      const user = JSON.parse(authUser);
      token = user?.token;
    } catch (error) {
      console.log(error);
    }
  }
  return token;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEPATH,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
