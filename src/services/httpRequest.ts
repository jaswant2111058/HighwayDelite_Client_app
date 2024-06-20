import axios, { AxiosResponse } from "axios";
import { refreshrefreshAccessTokenService } from "./authServices";
enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

interface HttpHeaders {
  [key: string]: string;
}

interface RequestOptions {
  url: string;
  method: HTTP_METHOD;
  data?: any;
  headers?: HttpHeaders;
}

const HTTP_REQUEST = (() => {
  axios.defaults.headers.put["Content-Type"] = "application/json";

  function getHeaders(): HttpHeaders {
    const state: string | null = sessionStorage.getItem("auth-storage") || null;

    const authToken =
      state !== null ? JSON.parse(state).state.accessToken : null;

    const headers: HttpHeaders = {
      "Content-Type": "application/json",
    };
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
  }

  async function GET<T>(url: string): Promise<T> {
    const options: RequestOptions = {
      url,
      method: HTTP_METHOD.GET,
      headers: getHeaders(),
    };

    const { data } = await axios(options);
    return data;
  }

  async function POST<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = {
      url,
      method: HTTP_METHOD.POST,
      data,
      headers: getHeaders(),
    };
    const res = await axios(options);
    return res;
  }

  async function PUT<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = {
      url,
      method: HTTP_METHOD.PUT,
      data,
      headers: getHeaders(),
    };

    const res = await axios(options);
    return res;
  }
  async function PATCH<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = {
      url,
      method: HTTP_METHOD.PATCH,
      data,
      headers: getHeaders(),
    };

    const res = await axios(options);
    return res;
  }

  async function DELETE<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    const options: RequestOptions = {
      url,
      method: HTTP_METHOD.DELETE,
      data,
      headers: getHeaders(),
    };

    const res = await axios(options);
    return res;
  }

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const storedState: string | null =
          sessionStorage.getItem("auth-storage") || null;
        const refreshToken =
          storedState !== null
            ? JSON.parse(storedState).state.refreshToken
            : null;
        const newAccessToken =
          await refreshrefreshAccessTokenService(refreshToken);

        if (storedState !== null) {
          // Parse the JSON string into an object
          const parsedState = JSON.parse(storedState);

          // Update the accessToken property with the new access token
          parsedState.state.accessToken = newAccessToken.data.data.access_token;

          // Stringify the object back to JSON
          const updatedState = JSON.stringify(parsedState);

          // Store the updated JSON string back into session storage
          sessionStorage.setItem("auth-storage", updatedState);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken.data.data.access_token}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  return {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH,
  };
})();

export default HTTP_REQUEST;
