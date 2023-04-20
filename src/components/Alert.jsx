import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

function Alert() {
    const {alert} = useContext(AlertContext);

  return (
    alert !== null && (
      <p className="flex items-start mb-4 space-x-2">
        {alert.type === "error" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <p className="flex-1 text-base font-semibold leading-7 text-primary">
          <strong>{alert.msg}</strong>
        </p>
      </p>
    )
  );
}

export default Alert;
