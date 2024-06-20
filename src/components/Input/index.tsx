import "./index.scss";

interface InputProps {
  label: string;
  type: string;
}
const Input = (props: InputProps) => {
  const { label, type } = props;
  return (
    <div className="input-box">
      <label className="label-name">{label}</label>
      <input className="input-field" type={type} placeholder={label}></input>
    </div>
  );
};

export default Input;
