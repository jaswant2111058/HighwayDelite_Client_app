import { FC } from "react";
import "./index.scss";
import { SignUPUiBtn } from "../../components/SignUI";
import FormHeader from "../../components/FormHeader";
import InputField from "../../components/InputField";
import InteractionButton from "../../components/InteractionButton";
import { IButtonType } from "../../common/interfaces/common.interface";


const SignIn: FC = () => {

    return (

        <div className="singnin-container">
            <div className="singnin-container__left">
                <SignUPUiBtn />
            </div>
            <div className="singnin-container__right">
                <div className="singnin-container__right__form-header">
                    <div>
                        <FormHeader title={"Let us know"} />
                    </div>

                </div>
                <form>

                    <InputField
                        type="text"
                        placeholder="Enter Email"
                        onClickIcon={() => { }}
                        iconRight={null}
                        value={""}
                        onChange={(e) => { console.log(e.targate.value) }}
                    />
                    <InputField
                        type="text"
                        placeholder="Enter Email"
                        onClickIcon={() => { }}
                        iconRight={null}
                        value={""}
                        onChange={(e) => { console.log(e.targate.value) }}
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
                        onClick={() => { }}
                        className="continue-btn"
                        isLoading={false}
                        type={IButtonType.LIGHT}
                    />

                </form>
            </div>
        </div>

    );
};

export default SignIn;
