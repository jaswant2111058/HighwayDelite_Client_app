import { FC } from "react";
import "./index.scss";
import { SignUPUiBtn } from "../../components/SignUI";
import FormHeader from "../../components/FormHeader";
import OtpComponent from "../../components/OtpComponent";

import { useNavigate } from "react-router-dom";
import { useAuthStore, IAuthStore } from "../../store/authStore";
import Toast from "../../components/Toast";
import { STATUS } from "../../utils/constants";


const OtpVerify: FC = () => {

    const naviagte = useNavigate()
    const { verifyOtp, isLoading, reSendOtp } = useAuthStore() as IAuthStore





    return (

        <div className="singnin-container">
            <div className="singnin-container__left">
                <SignUPUiBtn />
            </div>
            <div className="singnin-container__right">
                <div className="singnin-container__right__form-header">
                    <div>
                        <FormHeader title={"Let us verify you"} />
                    </div>
                </div>
                <div className="singnin-container__right__otp" >

                    <OtpComponent
                        length={6}
                        onSubmitOtp={async (otp) => {
                            const emailData: any = sessionStorage.getItem("auth-storage")
                            const isEmail = JSON.parse(emailData)
                            if (!isEmail) {
                                Toast(STATUS.ERROR, "Your are not Autherized to this page")
                                naviagte("/signup")
                            }
                            else {
                                const data = {
                                    email: isEmail?.state?.user?.email,
                                    otp,
                                }
                                console.log(data)
                                const res = await verifyOtp(data)
                                if (res) {
                                    naviagte("/signin")
                                }

                            }
                        }}
                        forgotPasswordHandler={async () => {
                            const emailData: any = sessionStorage.getItem("auth-storage")
                            const isEmail = JSON.parse(emailData)
                            if (!isEmail) {
                                Toast(STATUS.ERROR, "Your are not Autherized to this page")
                                naviagte("/signup")
                            }
                            else {
                                const data = {
                                    email: isEmail?.state?.user?.email,
                                }
                                console.log(data)
                                await reSendOtp(data)

                            }
                        }}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>

    );
};

export default OtpVerify;
