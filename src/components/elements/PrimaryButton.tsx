import React, { FC } from "react";

interface Props {
  text: string;
  onClick: (e: any) => void;
  disabled?: boolean;
}

export const PrimaryButton: FC<Props> = ({ text, onClick, disabled }) => {
  return (
    <button
      disabled={disabled === true}
      className={
        "h-9 focus:outline-none disabled:opacity-50 text-white text-sm py-2 w-5 flex-grow mr-1 bg-blue-900" +
        (disabled !== true ? " hover:bg-blue-600 hover:shadow-md" : " cursor-not-allowed")
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};
