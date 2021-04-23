import * as React from "react";

export interface IPrimaryButtonProps {
    text: string,
    onClick: () => void,
    disabled?: boolean
}

export function PrimaryButton({text, onClick, disabled}: IPrimaryButtonProps) {
  return (
    <button disabled={disabled===true} className={"focus:outline-none disabled:opacity-50 text-white text-sm py-2 w-5 flex-grow mr-1 bg-blue-900" + (disabled !== true ? " hover:bg-blue-600 hover:shadow-md" : "")}
        onClick={onClick}>
      {text}
    </button>
  );
}
