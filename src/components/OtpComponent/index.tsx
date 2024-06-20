import { useEffect, useRef, useState } from "react";
import { IButtonType } from "../../common/interfaces/common.interface";
import InteractionButton from "../InteractionButton";
import "./index.scss";
import Toast from "../../components/Toast";
import { STATUS } from "../../utils/constants";
interface IOtpComponent {
  length: number;
  onSubmitOtp: (value: any) => void;
  forgotPasswordHandler: any;
  isLoading: boolean;
}

const OtpComponent = ({
  length,
  onSubmitOtp,
  forgotPasswordHandler,
  isLoading,
}: IOtpComponent) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs: any = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOnChange = (index: number, e: any) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger on change at the end
    // const combinedOtp = newOtp.join("");
    // if (combinedOtp.length === length) onSubmitOtp(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOnKeyDown = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleOnClick = (index: number, e: any) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = () => {
    if (otp.join("").length < length) {
      Toast(STATUS.ERROR, "Please enter the OTP");
      return;
    }
    // if (otp.join("").length === length)
    onSubmitOtp(otp.join(""));
  };

  return (
    <div className="otp__container">
      <p className="otp__container-heading">Enter OTP</p>
      <div className="otp__container-inputs">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            value={value}
            placeholder="-"
            onChange={(e) => handleOnChange(index, e)}
            onClick={(e) => handleOnClick(index, e)}
            onKeyDown={() => handleOnKeyDown(index)}
            className="otp__container-inputs-value"
          />
        ))}
      </div>
      <p className="otp__container-resend">
        Didn’t receive the OTP?{" "}
        <strong onClick={() => forgotPasswordHandler()}>Resend OTP</strong>
      </p>
      <InteractionButton
        value="Verify"
        onClick={() => handleOtpSubmit()}
        className="otp__container-submit"
        isLoading={isLoading}
        type={IButtonType.DARK}
      />
    </div>
  );
};

export default OtpComponent;
