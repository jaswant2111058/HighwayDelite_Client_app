import { FC, useState } from "react";
import "./index.scss";
import { SignInUiBtn } from "../../components/SignUI";
import FormHeader from "../../components/FormHeader";
import InputField from "../../components/InputField";
import InteractionButton from "../../components/InteractionButton";
import { IButtonType } from "../../common/interfaces/common.interface";
import { useNavigate } from "react-router-dom";


const SignIn: FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword1, setShowPassword1] = useState(false)

    return (

        <div className="singnin-container">
            <div className="singnin-container__left">
                <SignInUiBtn />
            </div>
            <div className="singnin-container__right">
                <div className="singnin-container__right__form-header">
                    <div>
                        <FormHeader title={"Let us know"} />
                    </div>

                </div>
                <div>

                    <InputField
                        type="text"
                        placeholder="Email"
                        onClickIcon={() => { }}
                        iconRight={null}
                        value={email}
                        onChange={(e) => { setEmail(e.targate.value) }}
                    />
                    <InputField
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Password"
                        onClickIcon={() => {
                            setShowPassword1((prev) => !prev);
                        }}
                        iconRight={showPassword1 ? "showPassword" : "hidePassword"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value); // Corrected spelling of 'target'
                        }}
                    />

                    <InteractionButton
                        value="Sign In"
                        onClick={() => { }}
                        className="continue-btn"
                        isLoading={false}
                        type={IButtonType.DARK}
                    />
                    <InteractionButton
                        value="Sign Up"
                        onClick={() => { navigate("/signup") }}
                        className="continue-btn"
                        isLoading={false}
                        type={IButtonType.LIGHT}
                    />

                </div>
            </div>
        </div>

    );
};

export default SignIn;
