import React from "react";

type ButtonProps = {
  label: string;
  handleOnclick: () => void;
  disabled?: boolean; 
};

export const Button = ({ label, handleOnclick, disabled = false }: ButtonProps) => {
  return (
    <button
      className={`py-3 px-6 m-2.5 rounded-lg text-base transition-colors ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-sky-700 text-white hover:bg-sky-900 cursor-pointer"
      }`}
      onClick={handleOnclick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
