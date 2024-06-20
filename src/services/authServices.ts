import {
  changePassword,
  forgotPassword,
  forgotPasswordVerify,
  getUser,
  login,
  uploadImage,
  refreshToken,
} from "../utils/urlStrings";
import HTTP_REQUEST from "./httpRequest";
import axios from "axios";

export interface ILogin {
  login_id: string;
  password: string;
}

export interface IOtp {
  login_id: string;
  otp: string;
}

export interface ICreatepassword {
  new_password: string;
  token: string;
}

export interface IUpdateuser {
  email?: string;
  full_name?: string;
}

const getUserService = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${getUser}`;
  const response: any = await HTTP_REQUEST.GET(url);
  return response;
};

const loginService = async ({ login_id, password }: ILogin) => {
  const data = { login_id, password };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${login}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};

const forgotPasswordService = async (login_id: string) => {
  const data = { login_id };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${forgotPassword}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};

const sendOtpService = async ({ login_id, otp }: IOtp) => {
  const data = { login_id, otp };
  const url = `${
    import.meta.env.VITE_REACT_APP_BACKEND_URL
  }${forgotPasswordVerify}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};

const changePasswordService = async ({
  token,
  new_password,
}: ICreatepassword) => {
  const data = { token, new_password };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${changePassword}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};

const updateUserService = async ({ full_name, email }: IUpdateuser) => {
  const data: any = {};
  if (full_name) data.full_name = full_name;
  if (email) data.email = email;
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${getUser}`;
  const response: any = await HTTP_REQUEST.PUT(url, data);
  return response;
};

const updateUserProfileImageService = async (file: any) => {
  const data = { profile_image: file };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${uploadImage}`;
  const state: string | null = sessionStorage.getItem("auth-storage") || null;

  const authToken = state !== null ? JSON.parse(state).state.accessToken : null;
  const response: any = await axios.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

const removeUserProfileImageService = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${uploadImage}`;
  const response: any = await HTTP_REQUEST.DELETE(url);
  return response;
};

const refreshrefreshAccessTokenService = async (refresh_token: string) => {
  const data = { refresh_token };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${refreshToken}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};

export {
  changePasswordService,
  forgotPasswordService,
  loginService,
  sendOtpService,
  getUserService,
  updateUserService,
  updateUserProfileImageService,
  removeUserProfileImageService,
  refreshrefreshAccessTokenService,
};
