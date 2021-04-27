import React, { FC } from "react";

interface Props {
  text: string;
  onClick: (e: any) => void;
  disabled?: boolean;
}

export const SecondaryButton: FC<Props> = ({
  text,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      disabled={disabled === true}
      className={
        "focus:outline-none disabled:opacity-50  text-white text-sm py-2 w-5 flex-grow mr-1 bg-green-900" +
        (disabled !== true ? " hover:bg-green-600 hover:shadow-md" : " cursor-not-allowed")
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
