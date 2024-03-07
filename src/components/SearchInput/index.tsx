import React, { InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showSearchIcon?: boolean;
  classNamesInput?: string;
  classNamesDiv?: string;
}

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<SearchInputProps, "ref">
>(({ showSearchIcon, classNamesInput, classNamesDiv, ...props }, ref) => {
  return (
    <div
      className={`px-4 py-2 bg-gray-100 rounded-md border border-gray-400 flex items-center max-md:bg-white ${classNamesDiv}`}
    >
      <input
        {...props}
        ref={ref}
        type="text"
        className={`focus:outline-none bg-transparent w-full text-azulfy-rich-black ${classNamesInput}`}
      />
      {showSearchIcon && (
        <BsSearch size={16} className="text-azulfy-rich-black" />
      )}
    </div>
  );
});
