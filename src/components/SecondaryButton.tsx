import * as React from "react";

export interface ISecondaryButtonProps {
    text: string,
    onClick: () => void
}

export function SecondaryButton({text, onClick}: ISecondaryButtonProps) {
  return (
    <button className="focus:outline-none text-white text-sm py-2 w-5 flex-grow mr-1 bg-green-900 hover:bg-green-600 hover:shadow-md"
        onClick={onClick}>
      {text}
    </button>
  );
}