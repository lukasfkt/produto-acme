import React, { InputHTMLAttributes, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "username" | "password";
  showPassword?: boolean;
  classNamesDiv?: string;
}

export const Input = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "ref">
>(({ icon, showPassword, classNamesDiv, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div
      className={`flex items-center ${
        icon ? "px-3" : "px-4"
      } py-4 max-md:py-[14px] gap-[10px] bg-grey-600 border ${
        isFocused ? "border-primary-blue" : "border-grey-400"
      } rounded-lg min-w-[300px] ${classNamesDiv}`}
    >
      {icon === "username" && <FaRegUser size={20} />}
      {icon === "password" && <RiLockPasswordLine size={20} />}
      <input
        {...props}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={isPasswordVisible ? "text" : props.type}
        className="w-full bg-transparent border-none outline-none text-azulfy-rich-black max-md:text-sm font-bold font-comfortaa"
      />
      {showPassword && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <g opacity="0.5">
              <path
                d="M9.99998 6.61112C9.63197 6.61687 9.26668 6.67534 8.91526 6.78473C9.07782 7.07061 9.16437 7.39338 9.16665 7.72223C9.16665 7.97758 9.11635 8.23043 9.01864 8.46634C8.92092 8.70225 8.77769 8.9166 8.59713 9.09716C8.41657 9.27772 8.20222 9.42095 7.96631 9.51866C7.7304 9.61638 7.47755 9.66668 7.2222 9.66668C6.89335 9.66439 6.57058 9.57784 6.2847 9.41529C6.05916 10.1975 6.08545 11.0309 6.35984 11.7973C6.63424 12.5638 7.14283 13.2245 7.81358 13.6858C8.48433 14.1471 9.28323 14.3857 10.0971 14.3678C10.911 14.3499 11.6986 14.0763 12.3484 13.5859C12.9982 13.0954 13.4772 12.413 13.7176 11.6352C13.9579 10.8574 13.9475 10.0237 13.6877 9.25219C13.4279 8.48066 12.932 7.81042 12.2701 7.33642C11.6083 6.86241 10.8141 6.60866 9.99998 6.61112ZM19.8791 9.99307C17.9962 6.31911 14.2684 3.83334 9.99998 3.83334C5.73158 3.83334 2.00276 6.32084 0.120814 9.99341C0.0413845 10.1505 0 10.3241 0 10.5002C0 10.6762 0.0413845 10.8498 0.120814 11.007C2.0038 14.6809 5.73158 17.1667 9.99998 17.1667C14.2684 17.1667 17.9972 14.6792 19.8791 11.0066C19.9586 10.8495 20 10.6759 20 10.4998C20 10.3238 19.9586 10.1502 19.8791 9.99307ZM9.99998 15.5C6.57463 15.5 3.43436 13.5903 1.73852 10.5C3.43436 7.40973 6.57429 5.50001 9.99998 5.50001C13.4257 5.50001 16.5656 7.40973 18.2614 10.5C16.566 13.5903 13.4257 15.5 9.99998 15.5Z"
                fill={isPasswordVisible ? "#0072FF" : "#061425"}
              />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
});
