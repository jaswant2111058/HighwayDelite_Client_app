import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Toast from "../components/Toast";
import {
  verifyOtpService,
  loginService,
  signUpService,
  reSendOtpService
} from "../services/authServices";
import { STATUS } from "../utils/constants";

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthStore {
  accessToken?: string;
  refreshToken?: string;
  isLoading?: any;
  error?: object;
  user?: any;
  login?: any;
  signup?: any;
  verifyOtp?: any;
  reSendOtp?: any;
}

export interface IForgotPasswordStore {
  login_id?: string;
  sendForgotPasswordEmailStatus?: boolean;
  sendOtpVerificationStatus?: boolean;
  createNewPasswordStatus?: boolean;
  otp?: string;
  token?: string;
  isLoading?: any;
  error?: object;
  sendForgotPasswordEmail?: any;
  sendOtp?: any;
  createNewPassword?: any;
  removeToken?: any;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isLoading2: false,
      error: null,
      user: null,
      login: async ({ email, password }: ILogin) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await loginService({ email, password });
          if (data) {
            set({
              accessToken: data.data.token,
            });

            set({
              isLoading: false,
              error: null,
              user: {
                data
              },
            });
            Toast(STATUS.SUCCESS, "Login successfull");
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error,
            user: null,
            accessToken: null,
          });
          Toast(STATUS.ERROR, error.response.data.message);
        }
      },
      signup: async ({ first_name, last_name, email, password }: any) => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await signUpService({ first_name, last_name, email, password });
          Toast(STATUS.SUCCESS, `Otp send successfull to ${email}`);
          set({
            isLoading: false,
            error: null,
            user: {
              first_name,
              last_name,
              email
            },
          });
          return data;

        } catch (error: any) {
          set({
            isLoading: false,
            error: error,
          });
          Toast(STATUS.ERROR, error.response.data.message);
        }
      },
      verifyOtp: async ({ email, otp }: any) => {
        try {
          set({ isLoading: true, error: null });
          const res = await verifyOtpService({ email, otp });
          if (res) {
            set({
              isLoading: false,
              error: null,
            });
            Toast(STATUS.SUCCESS, "Opt verify successfully");
            return res;
          }
        }
        catch (error: any) {
          set({
            isLoading: false,
            error: error,
          });
          Toast(STATUS.ERROR, error.response.data.message);
        }
      },
      reSendOtp: async ({ email}: any) => {
        try {
          set({ isLoading: true, error: null });
          const res = await reSendOtpService({ email});
          if (res) {
            set({
              isLoading: false,
              error: null,
            });
            Toast(STATUS.SUCCESS, "Opt Send successfully");
            return res;
          }
        }
        catch (error: any) {
          set({
            isLoading: false,
            error: error,
          });
          console.log(error)
          Toast(STATUS.ERROR, error.response.data.message);
        }
      }

    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
