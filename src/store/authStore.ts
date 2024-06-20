import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Toast from "../components/Toast";
import {
  changePasswordService,
  forgotPasswordService,
  getUserService,
  IOtp,
  IUpdateuser,
  loginService,
  sendOtpService,
  updateUserService,
  updateUserProfileImageService,
  removeUserProfileImageService,
} from "../services/authServices";
import { STATUS, TOAST_MESSAGES } from "../utils/constants";

export interface ILogin {
  login_id: string;
  password: string;
}

export interface IAuthStore {
  accessToken?: string;
  refreshToken?: string;
  isLoading?: boolean;
  error?: object;
  user?: any;
  login?: any;
  logout?: any;
  updateUser?: any;
  updateUserProfileImage: any;
  removeUserProfileImage: any;
  isLoading2?: any;
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
      login: async ({ login_id, password }: ILogin) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await loginService({ login_id, password });
          if (data.message === "Success") {
            set({
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
            });
            const { data: userDetails } = await getUserService();
            if (userDetails) {
              set({
                isLoading: false,
                error: null,
                user: {
                  name: userDetails.full_name,
                  email: userDetails.email,
                  profile_image_url: userDetails.profile_image_url,
                },
              });
            }
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error,
            user: null,
            accessToken: null,
            refreshToken: null,
          });
          Toast(STATUS.ERROR, error.response.data.message);
        }
      },
      updateUser: async ({ full_name, email }: IUpdateuser) => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await updateUserService({ full_name, email });
          if (data.message === TOAST_MESSAGES.PROFILE_UPDATED) {
            const { data: userDetails } = await getUserService();
            if (userDetails) {
              set({
                isLoading: false,
                error: null,
                user: {
                  name: userDetails.full_name,
                  email: userDetails.email,
                  profile_image_url: userDetails.profile_image_url,
                },
              });
              return userDetails;
            }
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error,
          });
          Toast(STATUS.ERROR, error.response.data.message);
        }
      },
      updateUserProfileImage: async (file: any) => {
        set({ isLoading2: true, error: null });
        const res = await updateUserProfileImageService(file);
        if (res) {
          const { data: userDetails } = await getUserService();
          if (userDetails) {
            set({
              isLoading2: false,
              error: null,
              user: {
                name: userDetails.full_name,
                email: userDetails.email,
                profile_image_url: userDetails.profile_image_url,
              },
            });
            Toast(STATUS.SUCCESS, "Profile image added successfully");
            return userDetails.profile_image_url;
          }
        }
      },
      removeUserProfileImage: async () => {
        set({ isLoading2: true, error: null });
        const { data } = await removeUserProfileImageService();
        if (data) {
          const { data: userDetails } = await getUserService();
          if (userDetails) {
            set({
              isLoading2: false,
              error: null,
              user: {
                name: userDetails.full_name,
                email: userDetails.email,
                profile_image_url: userDetails.profile_image_url,
              },
            });
          }
        }
        Toast(STATUS.SUCCESS, "Profile Image Removed Succesful");
        return null;
      },
      logout: async () => {
        set({
          isLoading: false,
          error: null,
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoading2: false,
        });
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
        }, 1000);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useForgotPasswordStore = create((set, get) => ({
  login_id: null,
  sendForgotPasswordEmailStatus: false,
  sendOtpVerificationStatus: false,
  createNewPasswordStatus: false,
  otp: null,
  token: null,
  isLoading: false,
  error: null,

  sendForgotPasswordEmail: async (login_id: string) => {
    console.log(get());

    set({ isLoading: true, error: null });
    try {
      const { data } = await forgotPasswordService(login_id);
      if (data.message === "OTP sent successfully") {
        set({
          isLoading: false,
          login_id: login_id,
          error: null,
          sendForgotPasswordEmailStatus: true,
        });
        Toast(STATUS.SUCCESS, data.message);
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error,
        user: null,
        accessToken: null,
        refreshToken: null,
        sendForgotPasswordEmailStatus: false,
      });
      Toast(STATUS.ERROR, error.response.data.message);
    }
  },

  sendOtp: async ({ login_id, otp }: IOtp) => {
    set({ isLoading: true, error: null, sendOtpVerificationStatus: false });
    try {
      const { data } = await sendOtpService({ login_id, otp });
      if (data?.token) {
        set({
          isLoading: false,
          login_id: login_id,
          error: null,
          token: data?.token,
          sendForgotPasswordEmailStatus: false,
          sendOtpVerificationStatus: true,
        });
        Toast(STATUS.SUCCESS, data.message);
      }
    } catch (error: any) {
      console.log(error, "error");

      set({
        login_id: null,
        sendForgotPasswordEmailStatus: false,
        sendOtpVerificationStatus: false,
        otp: null,
        token: null,
        isLoading: false,
        error: null,
      });
      Toast(STATUS.ERROR, error.response.data.message);
    }
  },

  createNewPassword: async ({ token, newPassword }: any) => {
    set({ isLoading: true, error: null, sendOtpVerificationStatus: false });
    try {
      if (newPassword.password !== newPassword.confirmPassword) {
        set({
          login_id: null,
          sendForgotPasswordEmailStatus: false,
          sendOtpVerificationStatus: false,
          otp: null,
          isLoading: false,
          error: null,
        });
        Toast(STATUS.ERROR, TOAST_MESSAGES.PASSWORD_NOT_MATCHING);
      } else {
        const { data } = await changePasswordService({
          token,
          new_password: newPassword.password,
        });

        if (data.message === "password successfully changed!") {
          set({
            createNewPasswordStatus: true,
            token: null,
            isLoading: false,
            otp: null,
            sendForgotPasswordEmailStatus: false,
            sendOtpVerificationStatus: false,
            error: null,
          });
          Toast(STATUS.SUCCESS, TOAST_MESSAGES.PASSWORD_CHANGED);
        }
      }
    } catch (error: any) {
      set({
        login_id: null,
        sendForgotPasswordEmailStatus: false,
        sendOtpVerificationStatus: false,
        otp: null,
        token: null,
        isLoading: false,
        error: null,
      });
    }
  },

  removeToken: async () => {
    set({
      login_id: null,
      sendForgotPasswordEmailStatus: false,
      sendOtpVerificationStatus: false,
      createNewPasswordStatus: false,
      otp: null,
      token: null,
      isLoading: false,
      error: null,
    });
  },
}));

export const userEdits = create((set) => ({
  login_id: null,
  isFileSelected: false,
  isImageSet: false,
  token: null,
  isLoading: false,
  error: null,

  sendForgotPasswordEmail: async (login_id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await forgotPasswordService(login_id);
      if (data.message === "OTP sent successfully!") {
        set({
          isLoading: false,
          login_id: login_id,
          error: null,
          sendForgotPasswordEmailStatus: true,
        });
        Toast(STATUS.SUCCESS, data.message);
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error,
        user: null,
        accessToken: null,
        refreshToken: null,
        sendForgotPasswordEmailStatus: false,
      });
      Toast(STATUS.ERROR, error.response.data.message);
    }
  },

  sendOtp: async ({ login_id, otp }: IOtp) => {
    set({ isLoading: true, error: null, sendOtpVerificationStatus: false });
    try {
      const { data } = await sendOtpService({ login_id, otp });
      if (data?.token) {
        set({
          isLoading: false,
          login_id: login_id,
          error: null,
          token: data?.token,
          sendForgotPasswordEmailStatus: false,
          sendOtpVerificationStatus: true,
        });
        Toast(STATUS.SUCCESS, data.message);
      }
    } catch (error: any) {
      set({
        login_id: null,
        sendForgotPasswordEmailStatus: false,
        sendOtpVerificationStatus: false,
        otp: null,
        token: null,
        isLoading: false,
        error: null,
      });
      Toast(STATUS.ERROR, error.response.data.message);
    }
  },

  createNewPassword: async ({ token, newPassword }: any) => {
    set({ isLoading: true, error: null, sendOtpVerificationStatus: false });
    try {
      if (newPassword.password !== newPassword.confirmPassword) {
        set({
          login_id: null,
          sendForgotPasswordEmailStatus: false,
          sendOtpVerificationStatus: false,
          otp: null,
          isLoading: false,
          error: null,
        });
        Toast(STATUS.ERROR, TOAST_MESSAGES.PASSWORD_NOT_MATCHING);
      } else {
        const { data } = await changePasswordService({
          token,
          new_password: newPassword.password,
        });

        if (data.message === "password successfully changed!") {
          set({
            createNewPasswordStatus: true,
            token: null,
            isLoading: false,
            otp: null,
            sendForgotPasswordEmailStatus: false,
            sendOtpVerificationStatus: false,
            error: null,
          });
          Toast(STATUS.SUCCESS, TOAST_MESSAGES.PASSWORD_CHANGED);
        }
      }
    } catch (error: any) {
      set({
        login_id: null,
        sendForgotPasswordEmailStatus: false,
        sendOtpVerificationStatus: false,
        otp: null,
        token: null,
        isLoading: false,
        error: null,
      });
    }
  },

  removeToken: async () => {
    set({
      login_id: null,
      sendForgotPasswordEmailStatus: false,
      sendOtpVerificationStatus: false,
      createNewPasswordStatus: false,
      otp: null,
      token: null,
      isLoading: false,
      error: null,
    });
  },
}));
