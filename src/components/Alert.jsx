import { createPortal } from "react-dom";
const Alert = ({ classNameP, show, message }) => {
  return createPortal(
    <div
      className={`alert__component rounded-sm flex items-center justify-center 
        text-lg absolute bottom-0  right-3 ${
          show ? "translate-y-full opacity-100" : "-translate-y-full opacity-0"
        }  ${classNameP}  `}
    >
      <div>
        <span>{message}</span>
      </div>
    </div>,
    document.body
  );
};

export default Alert;
