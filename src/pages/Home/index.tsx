import { FC } from "react";
import "./index.scss";
import image1 from "../../assets/png/image1.png"
import { SignInUiBtn, SignUPUiBtn } from "../../components/SigninUI";

const Home: FC = () => {

    return (
        <div className="home-containermain">

            <div className="home-containermain__heading">
                Illustrator which you can use
            </div>
            <div className="home-container">

                <div className="home-container__right">

                    <div className="home-container__right__btn">
                        <SignUPUiBtn />
                    </div>
                    <img className="home-container__left__img" src={image1} />

                </div>
                <div className="home-container__left">
                    <div className="home-container__left__btn">
                        <SignInUiBtn />
                    </div>
                    <img className="home-container__left__img" src={image1} />

                </div>
            </div>
        </div>
    );
};

export default Home;
