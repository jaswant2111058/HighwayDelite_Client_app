import { FC } from "react";
import "./index.scss";
import image1 from "../../assets/png/image1.png"
import { useNavigate } from "react-router-dom";

export const SignInUiBtn: FC = () => {

    const naviagte = useNavigate()

    return (
        <div className="btn-container">
            <img className="btn-container__img" src={image1} />
            <div className="btn-container__btn">
                <div className="Signin-container"
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
    );
};

export const SignUPUiBtn: FC = () => {

    const naviagte = useNavigate()

    return (
        <div className="btn-container">
            <img className="btn-container__img" src={image1} />
            <div className="btn-container__btn">
                <div className="Signin-container"
                    onClick={() => {
                        naviagte("/signup")
                    }}
                >
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


