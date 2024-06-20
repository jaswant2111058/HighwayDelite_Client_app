import { FC } from "react";
import "./index.scss";
import { SignInUiBtn, SignUPUiBtn } from "../../components/SignUI";

const Home: FC = () => {

    return (
        <div className="home-containermain">

            <div className="home-containermain__heading">
                Illustrator which you can use
            </div>
            <div className="home-container">
                <div className="home-container__right">
                    <SignUPUiBtn />
                </div>
                <div className="home-container__left">
                    <SignInUiBtn />
                </div>
            </div>
        </div>
    );
};

export default Home;
