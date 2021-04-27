import React, { FC, useEffect, useState } from "react";

import { formatAmount } from "../utils/formatters";
import { IconButton } from "./elements/IconButton";

interface Props {
  title: string;
  amount: number;
  editType?: "none" | "hideIcon" | "title" | "amount";
  onChanged?: (value: string | number) => void;
  onClick?: () => void;
  isSelected?: boolean;
}

const getIcon = (
  editType: string | undefined,
  isEditMode: boolean,
  handleButtonClick: () => void
): JSX.Element | null => {
  const iconType = isEditMode ? "done" : "edit";
  switch (editType) {
    case "hideIcon":
      return <span className="ml-2 w-6 h-6"></span>;
    case "title":
    case "amount":
      return (
        <span className="ml-2">
          <IconButton iconType={iconType} onClick={handleButtonClick} />
        </span>
      );
  }
  return null;
};

const AmountRow: FC<Props> = ({
  title,
  amount,
  editType,
  onChanged,
  onClick,
  isSelected,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const [amountValue, setAmountValue] = useState((amount ?? 0).toFixed(2));
  useEffect(() => {
    setAmountValue(amount.toString());
  }, [amount]);

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef?.focus();
  }, [inputRef]);

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter") {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    if (isEditMode) {
      setEditMode(false);
      if (onChanged !== undefined) {
        if (editType === "amount") {
          const value = Number.parseFloat(amountValue);
          onChanged(isNaN(value) ? 0 : value);
        } else if (editType === "title") onChanged(titleValue);
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className={ "flex py-2 px-2" +
        (isSelected !== undefined ? " hover:bg-blue-100" : "") +
        (isSelected ? " bg-blue-100" : "")
      }
      onClick={() => {if (onClick !== undefined) onClick()}}
    >
      {isEditMode && editType === "title" ? (
        <input
          className="flex-grow w-8 pl-0 mr-2 appearance-none h-6 focus:outline-none ring border-gray-300 "
          value={titleValue}
          type="text"
          onKeyPress={handleInputKeyPress}
          onChange={e => setTitleValue(e.target.value)}
          ref={input => setInputRef(input)}
        ></input>
      ) : (
        <span className="flex-grow truncate text-gray-700">{title}&nbsp;</span>
      )}
      {isEditMode && editType === "amount" ? (
        <input
          className="flex-grow w-8 appearance-none h-6 ml-1 focus:outline-none ring border-gray-300 px-2"
          value={amountValue}
          onKeyPress={handleInputKeyPress}
          type="text"
          ref={input => setInputRef(input)}
          onChange={e => setAmountValue(e.target.value)}
        ></input>
      ) : (
        <span className="text-gray-700">{formatAmount(amount)}</span>
      )}
      {getIcon(editType, isEditMode, handleButtonClick)}
    </div>
  );
};

AmountRow.defaultProps = { editType: "none" };

export default AmountRow;
