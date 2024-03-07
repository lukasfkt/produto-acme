import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  textSize?: string;
}

export const LinearButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "ref">
>(({ text, textSize, ...props }, ref) => (
  <button
    className={`px-4 py-3 w-full shadow-md rounded-[10px] text-white text-center font-comfortaa ${
      textSize ? `text-[${textSize}px]` : "text-xl"
    } max-md:!text-base font-bold ${
      !props.disabled
        ? "bg-primary-Linear-Gradient hover:bg-primary-Linear-Gradient-hover transition-all active:scale-[0.98] active:bg-primary-Linear-Gradient-pressed"
        : "bg-grey-400"
    }`}
    {...props}
    ref={ref}
  >
    {text}
  </button>
));
