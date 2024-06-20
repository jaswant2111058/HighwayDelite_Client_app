import { FC } from "react";
import "./index.scss";

const FormHeader: FC = ({ title }: any) => {

    return (
        <div className="Header-container">

            <div className="Header-container__title">
                {title}
            </div>
            <div className="Header-container__exclametry">
                !
            </div>
        </div>
    );
};

export default FormHeader;
