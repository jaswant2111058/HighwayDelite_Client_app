import { FC, useState } from "react";
import "./index.scss";
import { SignUPUiBtn } from "../../components/SignUI";
import FormHeader from "../../components/FormHeader";
import InputField from "../../components/InputField";
import InteractionButton from "../../components/InteractionButton";
import { IButtonType } from "../../common/interfaces/common.interface";
import { useNavigate } from "react-router-dom";
import { useAuthStore, IAuthStore } from "../../store/authStore";
import Toast from "../../components/Toast";
import { STATUS } from "../../utils/constants";



const SignUp: FC = () => {

    const naviagte = useNavigate()
    const { signup } = useAuthStore() as IAuthStore


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [contactMode, setContactMode] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [contactModeValue, setContactModeValue] = useState("")


    const handleSignUp = async () => {

        if (!firstName || !lastName || !email || !password || !repassword || !contactModeValue) {
            Toast(STATUS.ERROR, "All fiels are required");
        }
        else {
            if (password !== repassword) {
                Toast(STATUS.ERROR, "Password nad Repassword must be same");
            }
            else {
                const data = {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password
                }
                const res = await signup(data)
                if (res) {
                    naviagte("/otpverify")
                }
            }
        }
    }



    return (
        <div className="singnup-container">
            <div className="singnup-container__left">
                <SignUPUiBtn />
            </div>
            <div className="singnup-container__right">
                <div className="singnup-container__right__form-header">
                    <div>
                        <FormHeader title={"Let us know"} />
                    </div>
                    <div>
                        <div className="SignUp-formHeader"
                            onClick={() => {
                                naviagte("/signin")
                            }}
                        >
                            <div className="sign">
                                Sign
                            </div>
                            <div className="in">
                                In
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    {contactMode &&
                        <>
                            <div className="selectBox">
                                <div className="selectBox__email"
                                    onClick={() => {
                                        setContactModeValue("Email")
                                        setContactMode(false)
                                    }}>
                                    Email
                                </div>
                            </div>
                        </>
                    }

                    <InputField
                        type="text"
                        placeholder="First Name"
                        onClickIcon={() => { }}
                        iconRight={null}
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                    />
                    <InputField
                        type="text"
                        placeholder="Last Name"
                        onClickIcon={() => { }}
                        iconRight={null}
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                    />

                    <InputField
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Set Password"
                        onClickIcon={() => {
                            setShowPassword1((prev) => !prev);
                        }}
                        iconRight={showPassword1 ? "showPassword" : "hidePassword"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value); // Corrected spelling of 'target'
                        }}
                    />
                    <InputField
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Retype password"
                        onClickIcon={() => {
                            setShowPassword2((prev) => !prev);
                        }}
                        iconRight={showPassword2 ? "showPassword" : "hidePassword"}
                        value={repassword}
                        onChange={(e) => {
                            setRePassword(e.target.value); // Corrected spelling of 'target'
                        }}
                    />
                    <InputField
                        type="text"
                        placeholder="Contact Mode"
                        onClickIcon={() => { setContactMode(prev => !prev) }}
                        iconRight={!contactMode ? "chevron" : "upArrow"}
                        value={contactModeValue}
                        onChange={(e) => { console.log(e.target.value) }}
                        disabled
                    />
                    <InputField
                        type="text"
                        placeholder="Enter Email"
                        onClickIcon={() => { }}
                        iconRight={null}
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}

                    />

                    <InteractionButton
                        value="Sign Up"
                        onClick={handleSignUp}
                        className="continue-btn"
                        isLoading={false}
                        type={IButtonType.DARK}
                    />
                </div>
            </div>
        </div>

    );
};

export default SignUp;
