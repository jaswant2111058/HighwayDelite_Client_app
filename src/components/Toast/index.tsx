import "./index.scss";
import { toast } from "sonner";
import Icon from "../../utils/icon";
import { STATUS } from "../../utils/constants";

const Toast = (type: string, message: string) => {
  const ToastMessage = () => {
    switch (type) {
      case STATUS.SUCCESS:
        return (
          <div className="toast-container success">
            <Icon src={STATUS.SUCCESS} />
            <p>{message}</p>
          </div>
        );
      case STATUS.ERROR:
        return (
          <div className="toast-container error">
            <Icon src={STATUS.ERROR} />
            <p>{message}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return toast(<ToastMessage />, {
    className: `${type}-container`,
    duration: 2000,
  });
};

export default Toast;
