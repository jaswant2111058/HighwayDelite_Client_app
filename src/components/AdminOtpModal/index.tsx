//adminotpmodal.tsx

import { forwardRef } from "react";
import OtpComponent from "../OtpComponent";
import "./index.scss";
import {
  useAdminManagementStore,
  IAdminManagementStore,
} from "../../store/adminManagementStore";

const AdminOtpModal = forwardRef(
  ({ initialData, transfer_to_email, closeModal }: any) => {
    const { transferOwnerOtpVerify, transferOwnerOtpResend, getSuperAdmin } =
      useAdminManagementStore() as IAdminManagementStore;

    const handleSendOtp = async (otp: string) => {
      let res = await transferOwnerOtpVerify(
        otp,
        initialData?.data.email,
        transfer_to_email,
      );
      if (res) {
        closeModal();
        getSuperAdmin();
      }
    };

    const handleSendEmailForOtp = () => {
      transferOwnerOtpResend("Superadmin", initialData?.data.email);
    };

    return (
      <div className="otp-input__container verification">
        <div className="otp-box__header">
          <h2 className="otp-box__header__heading">Verification</h2>
        </div>

        <p className="otp-box__desc">
          Enter 6 digits OTP sent on your registered email.
          <br />
          <div className="otp-box__desc__email">
            <div className="admin-password-email">
              {
                // Display email here
                initialData?.data.email
              }
            </div>
          </div>
        </p>
        <OtpComponent
          length={6}
          onSubmitOtp={(otp) => handleSendOtp(otp)}
          forgotPasswordHandler={() => handleSendEmailForOtp()}
          isLoading={false}
        />
      </div>
    );
  },
);

export default AdminOtpModal;
