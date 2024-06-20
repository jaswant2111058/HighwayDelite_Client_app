import { FC } from "react";
import "./index.scss";
import { IButtonType } from "../../common/interfaces/common.interface";
import Icon from "../../utils/icon";
interface IInteractionButton {
  value: string;
  onClick: () => void;
  className: string;
  type: IButtonType;
  isLoading: boolean;
}

const InteractionButton: FC<IInteractionButton> = ({
  value,
  onClick,
  className,
  type,
  isLoading,
}) => {
  return (
    <button
      className={`xen-interaction-btn ${className} ${type}`}
      onClick={() => onClick()}
    >
      {isLoading ? <Icon src={"loader"} /> : value}
    </button>
  );
};

export default InteractionButton;
