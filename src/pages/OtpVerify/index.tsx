import { FC } from "react";
import "./index.scss";
import { SignUPUiBtn } from "../../components/SignUI";
import FormHeader from "../../components/FormHeader";
import OtpComponent from "../../components/OtpComponent";


const OtpVerify: FC = () => {

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
                        onSubmitOtp={(otp) => {
                            console.log(otp)
                        }}
                        forgotPasswordHandler={()=>{
                            
                        }}
                        isLoading={false}
                    />

                </div>
            </div>
        </div>

    );
};

export default OtpVerify;
