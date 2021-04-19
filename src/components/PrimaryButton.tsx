import * as React from "react";

export interface IPrimaryButtonProps {
    text: string,
    onClick: () => void
}

export function PrimaryButton({text, onClick}: IPrimaryButtonProps) {
  return (
    <button className="focus:outline-none text-white text-sm py-2 w-5 flex-grow mr-1 bg-blue-900 hover:bg-blue-600 hover:shadow-md"
        onClick={onClick}>
      {text}
    </button>
  );
}
