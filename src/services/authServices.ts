import {
  verifyOtp,
  login,
  signup

} from "../utils/urlStrings";
import HTTP_REQUEST from "./httpRequest";

export interface ILogin {
  email: string;
  password: string;
}

export interface IOtp {
  email: string;
  otp: string;
}

export interface ICreatepassword {
  new_password: string;
  token: string;
}

export interface IUpdateuser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}


const loginService = async ({ email, password }: ILogin) => {
  const data = { email, password };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${login}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};


const verifyOtpService = async ({ email, otp }: IOtp) => {
  const data = { email, otp };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL
    }${verifyOtp}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};


const signUpService = async ({ first_name, last_name, email, password }: IUpdateuser) => {
  const data: any = { first_name, last_name, email, password };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${signup}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};

const refreshrefreshAccessTokenService = async (refresh_token: string) => {
  const data = { refresh_token };
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}${"refreshToken"}`;
  const response: any = await HTTP_REQUEST.POST(url, data);
  return response;
};



export {
  verifyOtpService,
  loginService,
  signUpService,
  refreshrefreshAccessTokenService
};
