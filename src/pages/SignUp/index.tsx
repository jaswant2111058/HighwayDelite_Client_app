import { FC } from "react";
import "./index.scss";
import { SignInUiBtn } from "../../components/SignUI";
import FormHeader from "../../components/FormHeader";
import InputField from "../../components/InputField";
import InteractionButton from "../../components/InteractionButton";
import { IButtonType } from "../../common/interfaces/common.interface";


const SignUp: FC = () => {

    return (

        <div className="singnup-container">
            <div className="singnup-container__left">
                <SignInUiBtn />
            </div>
            <div className="singnup-container__right">
                <div className="singnup-container__right__form-header">
                    <div>
                        <FormHeader title={"Let us know"} />
                    </div>
                    <div>
                        <div className="SignUp-formHeader">
                            <div className="sign">
                                Sign
                            </div>
                            <div className="in">
                                In
                            </div>
                        </div>
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
                    <InputField
                        type="text"
                        placeholder="Enter Email"
                        onClickIcon={() => { }}
                        iconRight={"lightEye" }
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
                        value="Sign Up"
                        onClick={() => { }}
                        className="continue-btn"
                        isLoading={false}
                        type={IButtonType.DARK}
                    />


                </form>
            </div>
        </div>

    );
};

export default SignUp;
