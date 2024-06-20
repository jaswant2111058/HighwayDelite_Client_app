import { FC } from "react";
import "./input.scss";
import Icon from "../../utils/icon";

interface IInputField {
  label?: string;
  type: string;
  placeholder: string;
  iconRight: any | null;
  onClickIcon: () => void | null;
  onChange: (value: any) => void;
  value?: string;
  disabled?: boolean;
  style?: any;
}

const InputField: FC<IInputField> = ({
  label,
  type,
  placeholder,
  iconRight,
  onClickIcon,
  onChange,
  value,
  disabled,
  style,
}) => {
  return (
    <div className="input-container" style={style}>
      {label && <label className="input-container__label">{label}</label>}
      <div className="input-container__box">
        <input
          className="input-container__box__input"
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          value={value}
          disabled={disabled || false}
        />
        {iconRight && (
          <span
            className="input-container__box__icon"
            onClick={() => onClickIcon()}
          >
            <Icon src={iconRight} />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
