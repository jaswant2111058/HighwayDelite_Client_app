import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IAuthStore,
  useAuthStore,
  useForgotPasswordStore,
} from "../../store/authStore";
import { LOGIN_STEPS } from "../../utils/constants";
import "./index.scss";
import {
  renderCreatePasswordView,
  renderLoginView,
  renderResetPasswordView,
  renderVerificationView,
} from "./loginCore";

interface IHandleInterface {
  loginState?: string;
  setShowpassword?: any;
  showPassword?: boolean;
  setLoginState?: any;
  loginHandler?: any;
  setCredentials?: any;
  credentials?: any;
  isLoading?: boolean;
  setForgotPasswordEmail?: any;
  forgotPasswordEmail?: string;
  forgotPasswordHandler?: any;
  isForgotPasswordApiLoading?: boolean;
  sendOtpHandler?: any;
  removeToken?: any;
  createPassword?: object;
  setCreatePassword?: any;
  createNewPasswordHandler?: any;
  clearForm: any;
}

const handleLoginView = ({
  loginState,
  setShowpassword,
  showPassword,
  setLoginState,
  loginHandler,
  setCredentials,
  credentials,
  isLoading,
  setForgotPasswordEmail,
  forgotPasswordEmail,
  forgotPasswordHandler,
  isForgotPasswordApiLoading,
  sendOtpHandler,
  removeToken,
  createPassword,
  setCreatePassword,
  createNewPasswordHandler,
  clearForm,
}: IHandleInterface) => {
  switch (loginState) {
    case LOGIN_STEPS.LOGIN:
      return renderLoginView({
        setShowpassword,
        showPassword,
        setLoginState,
        loginHandler,
        setCredentials,
        credentials,
        isLoading,
      });
    case LOGIN_STEPS.RESET_PASSWORD:
      return renderResetPasswordView({
        setLoginState,
        isLoading,
        setForgotPasswordEmail,
        forgotPasswordEmail,
        forgotPasswordHandler,
        isForgotPasswordApiLoading,
        clearForm,
      });
    case LOGIN_STEPS.VERIFICATION:
      return renderVerificationView({
        setLoginState,
        forgotPasswordHandler,
        forgotPasswordEmail,
        sendOtpHandler,
        isForgotPasswordApiLoading,
        removeToken,
        clearForm,
      });
    case LOGIN_STEPS.CREATE_PASSWORD:
      return renderCreatePasswordView({
        setShowpassword,
        showPassword,
        setLoginState,
        removeToken,
        createPassword,
        setCreatePassword,
        createNewPasswordHandler,
        isForgotPasswordApiLoading,
        clearForm,
      });
    default:
      return null;
  }
};

const Login: FC = () => {
  //global
  const { accessToken, isLoading, login } = useAuthStore() as IAuthStore;
  const {
    isLoading: isForgotPasswordApiLoading,
    sendForgotPasswordEmail,
    sendForgotPasswordEmailStatus,
    createNewPasswordStatus,
    sendOtpVerificationStatus,
    sendOtp,
    token,
    removeToken,
    createNewPassword,
  } = useForgotPasswordStore() as any;
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState(LOGIN_STEPS.LOGIN);
  const [showPassword, setShowpassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [credentials, setCredentials] = useState({
    login_id: "",
    password: "",
  });
  const [createPassword, setCreatePassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const clearForm = () => {
    setShowpassword(false);
    setCreatePassword({
      password: "",
      confirmPassword: "",
    });
    setForgotPasswordEmail("");
  };

  //{ login_id: "siteadmin@xencapture.com", password: "admin123" }

  const forgotPasswordHandler = async () => {
    if (forgotPasswordEmail) await sendForgotPasswordEmail(forgotPasswordEmail);
  };

  const loginHandler = async () => {
    await login(credentials);
    removeToken();
  };

  const createNewPasswordHandler = async () => {
    if (token) await createNewPassword({ newPassword: createPassword, token });
    else {
      setCreatePassword({
        password: "",
        confirmPassword: "",
      });
      // setLoginState(LOGIN_STEPS.LOGIN);
    }
  };

  const sendOtpHandler = async (otp: string) => {
    if (forgotPasswordEmail && otp)
      await sendOtp({ login_id: forgotPasswordEmail, otp: otp });
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }

    if (sendForgotPasswordEmailStatus) {
      setLoginState(LOGIN_STEPS.VERIFICATION);
    }

    if (sendOtpVerificationStatus && token) {
      setLoginState(LOGIN_STEPS.CREATE_PASSWORD);
    }

    if (createNewPasswordStatus) {
      setLoginState(LOGIN_STEPS.LOGIN);
    }
  }, [
    navigate,
    accessToken,
    sendForgotPasswordEmailStatus,
    sendOtpVerificationStatus,
    createNewPasswordStatus,
  ]);

  return (
    <div className="login-container">
      <div className="login-container__left">
        <p className="login-container__left__company-text">XenCapture</p>
        <div className="login-container__left__company-desc">
          <h2>Digitize your reality</h2>
          <p>Create 3D models of real-world objects in minutes using AI.</p>
        </div>
      </div>
      <div className="login-container__right">
        {handleLoginView({
          loginState,
          setShowpassword,
          showPassword,
          setLoginState,
          loginHandler,
          setCredentials,
          credentials,
          isLoading,
          setForgotPasswordEmail,
          forgotPasswordEmail,
          forgotPasswordHandler,
          isForgotPasswordApiLoading,
          sendOtpHandler,
          removeToken,
          createPassword,
          setCreatePassword,
          createNewPasswordHandler,
          clearForm,
        })}
      </div>
    </div>
  );
};

export default Login;
