import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IDialogDetails } from "../../common/interfaces/dialog.interface";
import { DIALOG_TYPE } from "../../utils/constants";
import "./index.scss";
import Icon from "../../utils/icon";

const getClassNames = (type: string, className: string) => {
  const classes = ["xen-dialog", className];

  switch (type) {
    case DIALOG_TYPE.TOP:
      classes.push("xen-dialog--top-view");
      break;
    case DIALOG_TYPE.BOTTOM:
      classes.push("xen-dialog--bottom-view");
      break;
    case DIALOG_TYPE.CENTER:
      classes.push("xen-dialog--center-view");
      break;
    case DIALOG_TYPE.LEFT:
      classes.push("xen-dialog--left-view");
      break;
    case DIALOG_TYPE.RIGHT:
      classes.push("xen-dialog--right-view");
      break;
    default:
      break;
  }

  return classes.join(" ");
};

const getButtonClassName = (button: any) => {
  const className = [];
  className.push("xen__action-button xen__ab--round-corner");

  if (button) {
    if (button.disabled) {
      className.push("xen__ab--disabled");
    }
    if (button.className) {
      className.push(button.className);
    }
  }

  return className.join(" ");
};

const getButtonContent = (buttons: any) => {
  return (
    buttons &&
    buttons.map((button: any, i: any) => {
      const className = getButtonClassName(button);
      return (
        <button
          type="button"
          key={`d-${i + 1}`}
          className={className}
          disabled={button.disabled}
          onClick={() => {
            button.action();
          }}
        >
          {button.value}
        </button>
      );
    })
  );
};

const Dialog = ({
  className,
  type,
  title,
  showCloseIcon,
  showDialog,
  content,
  buttons,
  onClickCloseIcon,
  customStyle,
}: IDialogDetails) => {
  const dialogRef = useRef(null) as unknown as React.RefObject<HTMLDivElement>;
  const [showDialogState, setShowDialogState] = useState(showDialog);
  const domId = document.getElementById("root");

  const onClose = () => {
    setShowDialogState(false);
    onClickCloseIcon();
  };

  const checkClickOutside = (e: any) => {
    if (
      showDialogState &&
      dialogRef.current &&
      !dialogRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    setShowDialogState(showDialog);
    document.addEventListener("mousedown", checkClickOutside);
    return () => document.removeEventListener("mousedown", checkClickOutside);
  }, [showDialog, showDialogState]);

  const classNames = getClassNames(type, className);
  const buttonContent = getButtonContent(buttons);

  if (!showDialogState) return null;

  const modal = (
    <div className={classNames}>
      <div
        className="xen-dialog__wrapper"
        ref={dialogRef}
        style={{ ...customStyle }}
      >
        {(title || showCloseIcon) && (
          <div className="xen-dialog__header">
            <div className="xen-dialog__header__title">{title}</div>
            {showCloseIcon && (
              <button
                type="button"
                className="xen-dialog__header--close-button"
                onClick={() => onClose()}
              >
                <Icon src="close" width={12} height={12} />
              </button>
            )}
          </div>
        )}
        {content && <div className="xen-dialog__content">{content}</div>}
        {buttons && (
          <div className="xen-dialog__footer">
            <div className="xen-dialog__footer__wrapper">{buttonContent}</div>
          </div>
        )}
      </div>
    </div>
  );

  return domId
    ? ReactDOM.createPortal(showDialogState ? modal : null, domId as any)
    : null;
};

export default Dialog;
