import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { ROUTES, TOKEN, API } from "@/constants/common/constant";
import { Storage } from "../storage/storage";

export const upik = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

upik.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Storage.getItem(TOKEN.ACCESS);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

upik.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isTokenExpired =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Storage.getItem(TOKEN.REFRESH);

    if (isTokenExpired) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = axios
          .patch(`${API.BASE_URL}/auth`, null, {
            headers: {
              "Refresh-Token": Storage.getItem(TOKEN.REFRESH) || "",
            },
          })
          .then((res) => {
            const newToken = (res.data as { data: { accessToken: string } })
              .data.accessToken;
            if (!newToken) {
              return Promise.reject("No access token");
            }
            Storage.setItem(TOKEN.ACCESS, newToken);
            upik.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            return newToken;
          })
          .catch((refreshError: AxiosError) => {
            return Promise.reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      originalRequest._retry = true;

      const newToken = await refreshPromise;
      if (!newToken) return Promise.reject(error);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return upik(originalRequest);
    }

    return Promise.reject(error);
  },
);
