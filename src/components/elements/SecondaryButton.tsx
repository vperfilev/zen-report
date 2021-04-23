import * as React from "react";

export interface ISecondaryButtonProps {
    text: string,
    onClick: () => void,
    disabled?: boolean
}

export function SecondaryButton({text, onClick, disabled}: ISecondaryButtonProps) {
  return (
    <button disabled={disabled===true} className={"focus:outline-none disabled:opacity-50  text-white text-sm py-2 w-5 flex-grow mr-1 bg-green-900" + (disabled !== true ? " hover:bg-green-600 hover:shadow-md" : "")}
        onClick={onClick}>
      {text}
    </button>
  );
}
