import { FC } from "react";
import "./index.scss";
import image1 from "../../assets/png/image1.png"

export const SignInUiBtn: FC = () => {

    return (
        <div className="btn-container">
            <img className="btn-container__img" src={image1} />
            <div className="btn-container__btn">
                <div className="Signin-container">
                    <div className="sign">
                        Sign
                    </div>
                    <div className="in">
                        In
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SignUPUiBtn: FC = () => {

    return (
        <div className="btn-container">
            <img className="btn-container__img" src={image1} />
            <div className="btn-container__btn">
                <div className="Signin-container">
                    <div className="sign">
                        Sign
                    </div>
                    <div className="in">
                        Up
                    </div>
                </div>
            </div>
        </div>
    );
};


