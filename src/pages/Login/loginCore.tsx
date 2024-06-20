import { IButtonType } from "../../common/interfaces/common.interface";
import InputField from "../../components/InputField";
import InteractionButton from "../../components/InteractionButton";
import OtpComponent from "../../components/OtpComponent";
import { LOGIN_STEPS } from "../../utils/constants";
import Icon from "../../utils/icon";

export const renderLoginView = ({
  setShowpassword,
  showPassword,
  setLoginState,
  loginHandler,
  setCredentials,
  credentials,
  isLoading,
}: any) => {
  return (
    <div className="login-input__container login">
      <p className="login-input__container--company-text">XenCapture</p>
      <div className="login-box">
        <div className="login-box__header">
          <h2 className="login-box__header__heading">Login</h2>
        </div>
        <p className="login-box__desc">
          Enter your Email ID and Password below to access your account.
        </p>
        <InputField
          label="Email"
          type="text"
          placeholder="Enter Email"
          onClickIcon={() => {}}
          iconRight={null}
          value={credentials.login_id}
          onChange={(e) =>
            setCredentials({ ...credentials, login_id: e.target.value })
          }
        />
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          onClickIcon={() => setShowpassword(!showPassword)}
          iconRight={showPassword ? "showPassword" : "hidePassword"}
          value={credentials.showPassword}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <div
          className="login-box__forgot-password"
          onClick={() => setLoginState(LOGIN_STEPS.RESET_PASSWORD)}
        >
          <p>Forgot password?</p>
        </div>
        <InteractionButton
          value="Log In"
          onClick={() => loginHandler()}
          className="login-btn"
          isLoading={isLoading}
          type={IButtonType.DARK}
        />
      </div>
    </div>
  );
};

export const renderResetPasswordView = ({
  setLoginState,
  setForgotPasswordEmail,
  forgotPasswordEmail,
  forgotPasswordHandler,
  isForgotPasswordApiLoading,
  clearForm,
}: any) => {
  return (
    <div className="login-input__container reset-password">
      <div className="login-box">
        <div className="login-box__header">
          <span
            onClick={() => {
              setLoginState(LOGIN_STEPS.LOGIN);
              clearForm();
            }}
          >
            <Icon src="back" />
          </span>
          <h2 className="login-box__header__heading">Reset Password</h2>
        </div>

        <p className="login-box__desc">
          Enter your registered Email ID to send a verification link to create
          new password.
        </p>
        <InputField
          label="Email"
          type="text"
          placeholder="Enter Email"
          onClickIcon={() => {}}
          iconRight={null}
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
        />
        <InteractionButton
          value="Continue"
          onClick={() => forgotPasswordHandler()}
          className="continue-btn"
          isLoading={isForgotPasswordApiLoading}
          type={IButtonType.DARK}
        />
      </div>
    </div>
  );
};

export const renderVerificationView = ({
  setLoginState,
  forgotPasswordHandler,
  forgotPasswordEmail,
  sendOtpHandler,
  isForgotPasswordApiLoading,
  removeToken,
  clearForm,
}: any) => {
  return (
    <div className="login-input__container verification">
      <div className="login-box">
        <div className="login-box__header">
          <span
            onClick={() => {
              removeToken();
              setLoginState(LOGIN_STEPS.RESET_PASSWORD);
              clearForm();
            }}
          >
            <Icon src="back" />
          </span>
          <h2 className="login-box__header__heading">Verification</h2>
        </div>

        <p className="login-box__desc">
          Enter 6 digits OTP sent on your registered email.
          <br />
          <div className="login-box__desc__email">
            <div className="forget-password-email">{forgotPasswordEmail}</div>
            <Icon src="bluePencil" />
            <span
              onClick={() => {
                removeToken();
                setLoginState(LOGIN_STEPS.RESET_PASSWORD);
              }}
            >
              <Icon src="editEmail" />
            </span>
          </div>
        </p>
        <OtpComponent
          length={6}
          onSubmitOtp={(otp) => {
            sendOtpHandler(otp);
          }}
          forgotPasswordHandler={forgotPasswordHandler}
          isLoading={isForgotPasswordApiLoading}
        />
      </div>
    </div>
  );
};

export const renderCreatePasswordView = ({
  setShowpassword,
  showPassword,
  setLoginState,
  removeToken,
  createPassword,
  setCreatePassword,
  createNewPasswordHandler,
  isForgotPasswordApiLoading,
  clearForm,
}: any) => {
  return (
    <div className="login-input__container create-password">
      <div className="login-box">
        <div className="login-box__header">
          <span
            onClick={() => {
              removeToken();
              setLoginState(LOGIN_STEPS.LOGIN);
              clearForm();
            }}
          >
            <Icon src="back" />
          </span>
          <h2 className="login-box__header__heading">Create Password</h2>
        </div>

        <p className="login-box__desc">
          Enter new password and confirm new password.
        </p>
        <InputField
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          onClickIcon={() => {
            setShowpassword(!showPassword);
          }}
          value={createPassword.password}
          iconRight={showPassword ? "showPassword" : "hidePassword"}
          onChange={(e) =>
            setCreatePassword({
              ...createPassword,
              password: e.target.value,
            })
          }
        />
        <InputField
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          value={createPassword.confirmPassword}
          onClickIcon={() => setShowpassword(!showPassword)}
          iconRight={showPassword ? "showPassword" : "hidePassword"}
          onChange={(e) =>
            setCreatePassword({
              ...createPassword,
              confirmPassword: e.target.value,
            })
          }
        />
        <InteractionButton
          value="Confirm"
          onClick={() => createNewPasswordHandler()}
          className="continue-btn"
          isLoading={isForgotPasswordApiLoading}
          type={IButtonType.DARK}
        />
      </div>
    </div>
  );
};
